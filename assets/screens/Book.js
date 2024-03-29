import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, Button, List } from 'react-native-paper'
import CenterPicker from '../components/CenterPicker';
import ClinicCard from '../components/ClinicCard';
import LocationPicker from '../components/LocationPicker';
import { ProgressCircle } from '../components/ProgressCircle';
import BookingProgress from '../components/BookingProgress';
import DatePicker from '../CustomHooks/DatePicker';
import useCollection from '../CustomHooks/useCollection';
import searchLogic from '../logic/searchLogic';
import { formatSlotsData } from '../DataFormatFunctions/formatSlotData';
import { buttonStyle } from '../constants/Constants';

/**
 * Screen for users to search for a clinic
 */
export default function Book({ navigation }) {

    //State Management
    const [chosenLocation, setChosenLocation] = useState(undefined)
    const [chosenCenter, setChosenCenter] = useState(undefined)
    const [chosenDate, setChosenDate] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [clinicList, setClinicList] = useState([])
    const [searchMessage, setSearchMessage] = useState("")
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    //custom hooks for standard data retrieval
    //retrieve Locations collection data
    const { collectionData: locationData, isCollectionLoading: isLocationLoaded, collectionError: locationError } 
    = useCollection(`Location`)
    //retrieve centers collection data
    const { collectionData: centerData, isCollectionLoading: isCenterLoaded, collectionError: centerError } 
    = useCollection(`Location/${chosenLocation}/Centers`, chosenLocation)

    //resets all state related to search fields
    function clearSearchFields() {
        setChosenLocation(undefined)
        setChosenCenter(undefined)
        setChosenDate(undefined)
        setLoading(false)
        setClinicList([])
        setSearchMessage("")
        setExpanded(true)
    }

    /**
     * Function to navigate to the clinic details screen for a selected clinic
     * @param {String} id clinic id
     */
    function showClinicDetails(id) {
        navigation.navigate('Clinic Information', {
            clinicId: id,
        })
        clearSearchFields()
    }

    /**
     * Function to perform a query on the firestore database based on the users search details
     * @param {String} collection Firestore Collection
     * @param {String} chosenLocation Chosen test location eg. Belfast
     * @param {String} chosenCenter Chosen test center
     * @param {String} chosenDate Chosen test date
     * @param {String} searchField Firestore document field
     * @param {String} clinicStatus Value Firestore documents are queried by
     */
    async function onSearch(collection, chosenLocation, chosenCenter, chosenDate, searchField, clinicStatus) {
        setLoading(true)
        setClinicList([])
        const clinicListArray = [];
        var clinicsFound = 0;
        if (chosenLocation) {
            const query = searchLogic(collection, chosenLocation, chosenCenter, chosenDate, searchField, clinicStatus)
            await query.get()
                .then(querySnapshot => {
                    //log the number of matchin clinics found from the search
                    clinicsFound = querySnapshot.size
                    if (clinicsFound > 0) {
                        querySnapshot.forEach(docSnapshot => {
                            const data = Object.assign(docSnapshot.data(), { id: docSnapshot.id })
                            clinicListArray.push(data)
                        });
                        //set states with compiled data
                        setClinicList(clinicListArray)
                        setSearchMessage(<Text>{clinicsFound} matching clinics found</Text>)
                        setExpanded(false)
                    } else {
                        setSearchMessage(<Text>No matching clinics found</Text>)
                        setExpanded(true)
                    }
                    setLoading(false)
                })
                .catch((e) => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
            setSearchMessage(<Text>Location must be selected as a minimum</Text>)
        }
    }

    //Data Rendering
    const searchResults =
        <FlatList
            data={clinicList}
            keyExtractor={(Item, index) => index.toString()}
            renderItem={({ item }) => (
                <ClinicCard
                    id={item.id}
                    status={item.clinicStatus}
                    location={item.location}
                    center={item.center}
                    addDetails={item.addDetails}
                    capacity={item.capacity}
                    date={item.date}
                    time={item.startTime}
                    details={showClinicDetails}
                    slots={formatSlotsData(item.slots, item.date).length}
                />
            )}
        />

    return (
        <>
            <View>
                <BookingProgress progress={0.25} />
            </View>
            <View style={BookStyles.body}>
                <List.Accordion expanded={expanded} onPress={handlePress} title="Clinic Search" id="1">
                    <View style={BookStyles.inputOptions}>
                        <LocationPicker locationData={locationData} chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} />
                        <CenterPicker chosenLocation={chosenLocation} centerData={centerData} chosenCenter={chosenCenter} setChosenCenter={setChosenCenter} />
                        <DatePicker chosenDate={chosenDate} setChosenDate={setChosenDate} placeholder="Choose a date" />
                        <View style={BookStyles.searchButtons}>
                            <Button
                                style={{ width: '50%', borderBottomLeftRadius: 5, borderBottomRightRadius: 0, borderTopLeftRadius: 5, borderTopRightRadius: 0 }}
                                labelStyle={buttonStyle.MDLabel}
                                color='#FFB9B9'
                                mode={'contained'}
                                onPress={() => {
                                    onSearch('Clinics', chosenLocation, chosenCenter, chosenDate, "clinicStatus", "Active")
                                }}>
                                Search
                            </Button>
                            <Button
                                style={{ width: '50%', borderBottomLeftRadius: 0, borderBottomRightRadius: 5, borderTopLeftRadius: 0, borderTopRightRadius: 5 }}
                                labelStyle={buttonStyle.MDLabel}
                                color='#F9A8E7'
                                mode={'contained'}
                                onPress={() => clearSearchFields()}>
                                Reset
                            </Button>

                        </View>
                    </View>
                </List.Accordion>

                <View style={BookStyles.mainContent}>
                    {/* Conditional rendering of loading icon while search results are loading */}
                    {loading ?
                        <View style={BookStyles.progress}>
                            <ProgressCircle />
                        </View>
                        :
                        <View>
                            <View style={BookStyles.message}>
                                {searchMessage}
                                {locationError}
                                {centerError}
                            </View>
                            <View>
                                {searchResults}
                            </View>
                        </View>
                    }
                </View>
            </View>
        </>
    );
}

const BookStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    inputOptions: {
        width: '95%',
        backgroundColor: '#ffffff',
        paddingLeft: 20,
    },
    searchButtons: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    mainContent: {
        flex: 0.83,
        width: '95%',
        paddingLeft: 15,
    },
    progress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    }
})
