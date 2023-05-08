import { useState, useEffect } from 'react'
import { setCollectionListener } from '../FirestoreFunctions/FirestoreRead';


/**
 * Custom hook used to perform real time data retrievel from firestore collection
 * @param {String} collection Firestore collection
 * @param {field} Firestore field to Query
 * @param {state variable} filter Radio button state passed to useEffect dependency array
 * @returns Array of collectionData, Boolean or isCollectionLoading, String collectionError
 */
export default function useCollectionOnSnapshot(collection, field, filter) {
    const [collectionData, setCollectionData] = useState([]);
    const [isCollectionLoading, setIsCollectionLoading] = useState(true);
    const [collectionError, setCollectionError] = useState();

    useEffect(() => {
        //setCollectionListener function called
        const subscriber = setCollectionListener(collection, field, filter)
            .onSnapshot(querySnapshot => {
                let appointmentListArray = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = {
                        id: doc.id
                    }
                    const combined = Object.assign(data, id)
                    appointmentListArray.push(combined)
                })
                setCollectionData(appointmentListArray)
                setIsCollectionLoading(false)
            });
        return () => subscriber()
    }, [filter])

    return {
        collectionData,
        isCollectionLoading,
        collectionError
    }

}

