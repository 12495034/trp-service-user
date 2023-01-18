import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Pressable, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { Text } from 'react-native-paper'
import CenterPicker from '../components/CenterPicker';
import ClinicCard from '../components/ClinicCard';
import DatePicker from '../components/DatePicker';
import LocationPicker from '../components/LocationPicker';
import * as Progress from 'react-native-progress';
import firestore from '@react-native-firebase/firestore';


export default function Book({ navigation }) {

    const [locationData, setLocationData] = useState([])
    const [centerData, setCenterData] = useState([])
    const [chosenLocation, setChosenLocation] = useState("")
    const [chosenCenter, setChosenCenter] = useState("")
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(undefined)
    const [clinicList, setClinicList] = useState([])
    const [searchMessage, setSearchMessage] = useState("")

    console.log("chosenLocation:", chosenLocation)
    // console.log(chosenCenter)
    // console.log(text)
    console.log(loading)

    useEffect(() => {
        fetchClinicLocationData()
    }, [chosenLocation])

    //function to get a list of locations 
    function fetchClinicLocationData() {
        firestore()
            .collection('Location')
            .onSnapshot(querySnapshot => {
                let clinicLocations = []
                querySnapshot.forEach((doc) => {
                    const location = { location: doc.id }
                    clinicLocations.push(location)
                })
                setLocationData(clinicLocations)
            });
        fetchCenterData()
    }

    //re-write this function is react native firebase syntax
    //function get list of centers for the selected city location
    function fetchCenterData() {
        setChosenCenter("")
        //setText("")
        firestore().collection('Location')
            .doc(`${chosenLocation}`)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    var centerArray = []
                    Object.keys(documentSnapshot.data()).forEach(function (key, index) {
                        const centerList = { center: key }
                        centerArray.push(centerList)
                    });
                    setCenterData(centerArray)
                } else {
                    // doc.data() will be undefined in this case
                    //console.log("No such document!");
                }
            })
    }

    //search is triggered specifically data is not loaded. Therefore this does not need to wrapped inside a useEffect hook
    //as a snapshot listener is not used then the data does not update in real time
    //TODO: try writing a cloud function that changes the 
    function onSearch() {
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
            //logic above determines the appropriate search syntax
            filters
                .get()
                .then(querySnapshot => {
                    //console.log('Number of clinics: ', querySnapshot.size);
                    querySnapshot.forEach(documentSnapshot => {
                        //console.log('clinic ID: ', documentSnapshot.id, documentSnapshot.data());
                        const combined = {}
                        const data = documentSnapshot.data()
                        const id = {
                            id: documentSnapshot.id
                        }
                        Object.assign(combined, data, id)
                        clinicListArray.push(combined)
                    });
                    setClinicList(clinicListArray)
                });
            setLoading(false)
            setSearchMessage("")
        } else {
            setSearchMessage(<Text>Location must be selected as a minimum</Text>)
        }
    }

    function showClinicDetails(id) {
        setClinicList({})
        navigation.navigate('Clinic Information', {
            clinicId: id,
        })
    }

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
                    <CenterPicker centerData={centerData} chosenCenter={chosenCenter} setChosenCenter={setChosenCenter} />
                    <DatePicker text={text} setText={setText} />
                </View>
                <View style={BookStyles.searchButtons}>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#dddddd' : '#FFB9B9', borderBottomLeftRadius: 10 },
                            BookStyles.button
                        ]}
                        delayLongPress={5000}
                        onPress={() => onSearch()}
                    >
                        <Text>
                            Search
                        </Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#dddddd' : '#F9A8E7', borderBottomRightRadius: 10 },
                            BookStyles.button
                        ]}
                        onPress={() => clearSearchFields()}
                    >
                        <Text>
                            Reset
                        </Text>
                    </Pressable>
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
