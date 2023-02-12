import { useState, useEffect } from 'react'
import { setCollectionListener } from '../FirestoreFunctions/FirestoreRead';

export default function useCollectionOnSnapshot(collection, filter) {
    //Hook state
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [isCollectionLoading, setIsCollectionLoading] = useState(true);
    const [collectionError, setCollectionError] = useState('');

    useEffect(() => {
        const subscriber = setCollectionListener(collection, filter)
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
                setAppointmentsData(appointmentListArray)
                setIsCollectionLoading(false)
            });
        return () => subscriber()
    }, [filter])

    return {
        appointmentsData,
        isCollectionLoading,
        collectionError
    }

}

