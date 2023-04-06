import { useState, useEffect } from 'react'
import { setCollectionListener } from '../FirestoreFunctions/FirestoreRead';

//Custom hook to retrieve all document details stored in a collection
//Real time updates
export default function useCountOnSnapshot(collection, filter) {
    const [countData, setCountData] = useState(0);
    const [isCountLoading, setIsCountLoading] = useState(true);
    const [countError, setCountError] = useState();

    useEffect(() => {
        const subscriber = setCollectionListener(collection, filter)
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

