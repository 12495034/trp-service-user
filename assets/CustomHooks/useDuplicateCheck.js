import { useState, useEffect } from 'react'
import { fetchCollectionDocuments } from '../FirestoreFunctions/FirestoreRead';

//custom hook to determine if a document with the users id exists in a collection
export default function useDuplicateCheck(collection, docId) {
    const [isDocPresent, setIsDocPresent] = useState(false);
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        fetchCollectionDocuments(collection)
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.id === docId) {
                        setIsDocPresent(true)
                    }
                });
            })
            .catch((e) => {
            })
    }, [docId]);

    return {
        isDocPresent,
        isDocLoading,
        docError
    }

}

