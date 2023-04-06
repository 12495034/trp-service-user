import { useState, useEffect } from 'react'
import { fetchDocumentData } from '../FirestoreFunctions/FirestoreRead';

//Custom hook to retrieve document data
//Single read
export default function useDoc(collection, doc, dependency) {
    const [docData, setDocData] = useState({});
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        if (collection) {
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