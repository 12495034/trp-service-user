import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper'
import CenterPicker from '../components/CenterPicker';
import ClinicCard from '../components/ClinicCard';
import DatePicker from '../CustomHooks/DatePicker';
import LocationPicker from '../components/LocationPicker';
import useCollection from '../CustomHooks/useCollection';
import searchLogic from '../logicFunctions.js/searchLogic';
import { ProgressCircle } from '../components/ProgressCircle';
import { formatSlotsData } from '../DataFormatFunctions/formatSlotData';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { progressBarColor } from '../constants/Constants';

export default function Book({ navigation }) {

    const [chosenLocation, setChosenLocation] = useState(undefined)
    const [chosenCenter, setChosenCenter] = useState(undefined)
    const [chosenDate, setChosenDate] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [clinicList, setClinicList] = useState([])
    const [searchMessage, setSearchMessage] = useState("")

    //custom hooks for standard data retrieval
    //retrieve Locations collection data
    const { collectionData: locationData, isCollectionLoading: isLocationLoaded, collectionError: locationError } = useCollection(`Location`)
    //retrieve centers collection data
    const { collectionData: centerData, isCollectionLoading: isCenterLoaded, collectionError: centerError } = useCollection(`Location/${chosenLocation}/Centers`, chosenLocation)

    //resets all state related to search fields
    function clearSearchFields() {
        setChosenLocation(undefined)
        setChosenCenter(undefined)
        setChosenDate(undefined)
        setLoading(false)
        setClinicList([])
        setSearchMessage("")
    }

    //navigates to clinic detail screen, passing the chosen clinic id as a parameter
    function showClinicDetails(id) {
        navigation.navigate('Clinic Information', {
            clinicId: id,
        })
        clearSearchFields()
    }

    //performs a query on the firestore database clinics collection
    async function onSearch(collection, chosenLocation, chosenCenter, chosenDate, searchField, clinicStatus) {
        setLoading(true)
        const clinicListArray = [];
        var clinicsFound = 0;
        if (chosenLocation) {
            const query = searchLogic(collection, chosenLocation, chosenCenter, chosenDate, searchField, clinicStatus)
            await query
                .get()
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
                    } else {
                        setSearchMessage(<Text>No matching clinics found</Text>)
                    }
                    setLoading(false)
                })
                .catch((e) => {
                    console.log(e.message)
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
                <ProgressBar progress={0.25} color={progressBarColor} />
            </View>
            <View style={BookStyles.body}>
                <View style={BookStyles.inputOptions}>
                    <LocationPicker locationData={locationData} chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} />
                    <CenterPicker chosenLocation={chosenLocation} centerData={centerData} chosenCenter={chosenCenter} setChosenCenter={setChosenCenter} />
                    <DatePicker chosenDate={chosenDate} setChosenDate={setChosenDate} />
                    <View style={BookStyles.searchButtons}>
                        <Button
                            style={{ width: '50%', borderBottomLeftRadius: 10, borderBottomRightRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                            labelStyle={{ fontSize: 12 }}
                            color='#FFB9B9'
                            mode={'contained'}
                            onPress={() => onSearch('Clinics', chosenLocation, chosenCenter, chosenDate, "clinicStatus", "Active")}>
                            Search
                        </Button>
                        <Button
                            style={{ width: '50%', borderBottomLeftRadius: 0, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                            labelStyle={{ fontSize: 12 }}
                            color='#F9A8E7'
                            mode={'contained'}
                            onPress={() => clearSearchFields()}>
                            Reset
                        </Button>

                    </View>
                </View>
                <View style={BookStyles.mainContent}>
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
        alignItems: 'center'
    },
    inputOptions: {
        width: '90%',
        backgroundColor: '#ffffff'
    },
    searchButtons: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    mainContent: {
        flex: 0.83,
        width: '90%',
    },
    progress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginBottom: 10,
    }
})
