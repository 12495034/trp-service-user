import { useState, useEffect } from 'react'
import { setCollectionListener } from '../FirestoreFunctions/FirestoreRead';

//Custom hook to retrieve all document details stored in a collection
//Real time updates
/**
 * Custom hook used to perform real time count of data in firestore collection
 * @param {String} collection Firestore Collection
 * @param {String} field Firestore document field
 * @param {state variable} filter Radio button state passed to useEffect dependency array
 * @returns Int countData, Boolean isCountLoading, String countError
 */
export default function useCountOnSnapshot(collection, field, filter) {
    const [countData, setCountData] = useState(0);
    const [isCountLoading, setIsCountLoading] = useState(true);
    const [countError, setCountError] = useState();

    useEffect(() => {
        const subscriber = setCollectionListener(collection, field, filter)
            .onSnapshot(querySnapshot => {
                    setCountData(querySnapshot.size)
                    setIsCountLoading(false)
            });
        return () => subscriber()
    }, [filter])

    return {
        countData,
        isCountLoading,
        countError
    }

}

