import { useState, useEffect } from 'react'
import { fetchCollectionDocuments } from '../FirestoreFunctions/FirestoreRead';

export default function useDuplicateCheck(collection, docId) {
    //Hook state
    const [isDocPresent, setIsDocPresent] = useState(false);
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        console.log("hook collection:",collection)
        fetchCollectionDocuments(collection)
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log("user id in appointment:",documentSnapshot.id)
                    console.log("user id:", docId)
                    if (documentSnapshot.id === docId) {
                        setIsDocPresent(true)
                    }
                });
            })
            .catch((e) => {
                console.log("duplicate check custom hook")
                console.log("error:",e.message)
            })
    }, [docId]);

    return {
        isDocPresent,
        isDocLoading,
        docError
    }

}

