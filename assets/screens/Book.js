import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Pressable, SafeAreaView, FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper'
import CenterPicker from '../components/CenterPicker';
import ClinicCard from '../components/ClinicCard';
import DatePicker from '../components/DatePicker';
import LocationPicker from '../components/LocationPicker';
import * as Progress from 'react-native-progress';
import firestore from '@react-native-firebase/firestore';
import { fetchCollectionDocuments, fetchDocumentData } from '../FirestoreFunctions/FirestoreRead';

export default function Book({ navigation }) {

    const [locationData, setLocationData] = useState([])
    const [centerData, setCenterData] = useState([])
    const [chosenLocation, setChosenLocation] = useState(undefined)
    const [chosenCenter, setChosenCenter] = useState(undefined)
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(undefined)
    const [clinicList, setClinicList] = useState([])
    const [searchMessage, setSearchMessage] = useState("")

    //clinic location Data and center data fetched by use effect following page render
    useEffect(() => {
        fetchClinicLocationData()
        fetchCenterData()
    }, [chosenLocation])

    console.log(clinicList)

    //populate city location options in dropdown
    function fetchClinicLocationData() {
        fetchCollectionDocuments("Location")
            .then(querySnapshot => {
                var clinicLocations = []
                querySnapshot.forEach((doc) => {
                    const location = { location: doc.id }
                    clinicLocations.push(location)
                })
                setLocationData(clinicLocations)
            })
            .catch((e) => {
                console.log("promise rejection", e.message)
            })
    }

    //populate centers list based on chosen location
    function fetchCenterData() {
        if (chosenLocation) {
            fetchCollectionDocuments(`Location/${chosenLocation}/Centers`)
                .then(querySnapshot => {
                    var clinicCenters = []
                    querySnapshot.forEach((doc) => {
                        const center = {
                            id: doc.id,
                            name: doc.data().name
                        }
                        clinicCenters.push(center)
                    })
                    setCenterData(clinicCenters)
                })
                .catch((e) => {
                    console.log("promise rejection", e.message)
                })
        }
    }

    //performs a query on the firestore database clinics collection
    //logic used to determine the appropriate search syntax
    function onSearch() {
        console.log("Chosen location", chosenLocation)
        if (chosenLocation) {
            var filters = ""
            if (chosenCenter === "" && text != "") {
                filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                    .where('location', '==', `${chosenLocation}`)
                    .where('date', '==', `${text}`)
            } else if (chosenCenter != "" && text === "") {
                filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                    .where('location', '==', `${chosenLocation}`)
                    .where('center', '==', `${chosenCenter}`)
            } else if (chosenCenter === "" && text === "") {
                filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                    .where('location', '==', `${chosenLocation}`)
            } else {
                filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                    .where('location', '==', `${chosenLocation}`)
                    .where('center', '==', `${chosenCenter}`)
                    .where('date', '==', `${text}`)
            }

            const clinicListArray = []
            setLoading(true)
            filters
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        //TODO:refactor this code when the firestore database structure is ammended
                        const combined = {}
                        const data = documentSnapshot.data()
                        const id = {
                            id: documentSnapshot.id
                        }
                        Object.assign(combined, data, id)
                        clinicListArray.push(combined)
                    });
                    setClinicList(clinicListArray)
                })
                .catch((e) => {
                    console.log(e.message)
                })
            setLoading(false)
            setSearchMessage("")
        } else {
            setSearchMessage(<Text>Location must be selected as a minimum</Text>)
        }
    }

    //navigates to clinic detail screen, passing the choosen clinics id as a parameter
    function showClinicDetails(id) {
        navigation.navigate('Clinic Information', {
            clinicId: id,
        })
    }

    //resets all state related to search fields
    function clearSearchFields() {
        setChosenLocation("")
        setChosenCenter("")
        setText("")
        setClinicList([])
        setSearchMessage("")
    }

    //Data Rendering
    const searchResults =
        <FlatList
            data={clinicList}
            keyExtractor={(Item, index) => index.toString()}
            renderItem={({ item }) => (
                <ClinicCard id={item.id} status={item.clinicStatus} location={item.location} center={item.center} capacity={item.capacity} date={item.date} time={item.startTime} details={showClinicDetails} slots={item.slots} />
            )}
        />

    return (
        <View style={BookStyles.body}>
            <View style={BookStyles.inputOptions}>
                <View style={BookStyles.fields}>
                    <LocationPicker locationData={locationData} chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} />
                    <CenterPicker chosenLocation={chosenLocation} centerData={centerData} chosenCenter={chosenCenter} setChosenCenter={setChosenCenter} />
                    <DatePicker text={text} setText={setText} />

                    <View style={BookStyles.searchButtons}>
                        <Button
                            style={{ width: '50%', borderBottomLeftRadius: 10, borderBottomRightRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                            labelStyle={{ fontSize: 12 }}
                            color='#FFB9B9'
                            mode={'contained'}
                            onPress={() => onSearch()}>
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
            </View>
            <View style={BookStyles.results}>
                <SafeAreaView>
                    {loading ?
                        <View style={BookStyles.progress}>
                            <Progress.Circle
                                size={60}
                                indeterminate={true}
                                endAngle={0.6}
                                animated={true}
                                color={'red'}
                                borderColor={'red'}
                                showsText={true} />
                        </View>
                        :
                        <View>
                            {searchMessage}
                            {searchResults}
                        </View>}
                </SafeAreaView>
            </View>
        </View>
    );
}

const BookStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    fields: {
        width: '90%',
    },
    inputOptions: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        width: "45%",
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    searchButtons: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    results: {
        flex: 1,
        width: '90%',
    },
    progress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
