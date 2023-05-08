import { useState, useEffect } from 'react'
import { fetchCollectionDocuments } from '../FirestoreFunctions/FirestoreRead';

/**
 * Custom hook used to check for presence of appointment in a current clinic
 * @param {String} collection 
 * @param {Stirng} docId 
 * @returns Boolean isDocPresent, Boolean isDocLoading, String docError
 */
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

