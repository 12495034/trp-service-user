import { useState, useEffect } from 'react'
import { fetchDocumentData } from '../FirestoreFunctions/FirestoreRead';

/**
 * Custom hook used to perform one time data retrieval from Firestore document
 * @param {String} collection Firestore Collection
 * @param {String} doc Firestore Document
 * @param {state variable} dependency passed to dependency array of useEffect
 * @returns Object docData, Boolean, isDocLoading, String docError
 */
export default function useDoc(collection, doc, dependency) {
    const [docData, setDocData] = useState({});
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        if (collection) {
            //fetchDocumentData function called
            fetchDocumentData(collection, doc)
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        setDocData(documentSnapshot.data())
                        setIsDocLoading(false)
                    } else {
                        setDocError("Document does not exist");
                    }
                })
                .catch((e)=>{
                    setDocError(e.message)
                    setIsDocLoading(false)
                })
        } 
    }, [dependency]);

    return {
        docData,
        isDocLoading,
        docError
    }

}