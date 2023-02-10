import React from 'react'
import { useState, useEffect } from 'react'
import { fetchCollectionDocuments } from '../FirestoreFunctions/FirestoreRead';

export default function useSearchClinics(collection, chosenLocation, chosenCenter, chosenDate, dependency) {
    //Hook state
    const [clinicList, setClinicList] = useState([]);
    const [collectionData, setCollectionData] = useState([]);
    const [isCollectionLoading, setIsCollectionLoading] = useState(true);
    const [collectionError, setCollectionError] = useState('');

    if (chosenLocation) {
        var filters = ""
        if (chosenCenter === "" && chosenDate != "") {
            filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                .where('location', '==', `${chosenLocation}`)
                .where('date', '==', `${chosenDate}`)
        } else if (chosenCenter != "" && chosenDate === "") {
            filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                .where('location', '==', `${chosenLocation}`)
                .where('center', '==', `${chosenCenter}`)
        } else if (chosenCenter === "" && chosenDate === "") {
            filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                .where('location', '==', `${chosenLocation}`)
        } else {
            filters = firestore().collection('Clinics').where('clinicStatus', '==', 'Active')
                .where('location', '==', `${chosenLocation}`)
                .where('center', '==', `${chosenCenter}`)
                .where('date', '==', `${chosenDate}`)
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

    return {
        collectionData,
        isCollectionLoading,
        collectionError
    }

}