import { useState, useEffect } from 'react'
import { fetchCollectionDocuments } from '../FirestoreFunctions/FirestoreRead';

export default function useDuplicateCheck(collection, docId) {
    //Hook state
    const [isDocPresent, setIsDocPresent] = useState(false);
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        fetchCollectionDocuments(collection)
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log(documentSnapshot.id)
                    if (documentSnapshot.id === docId) {
                        setIsDocPresent(true)
                    }
                });
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [docId]);

    return {
        isDocPresent,
        isDocLoading,
        docError
    }

}

