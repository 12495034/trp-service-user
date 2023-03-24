import { useState, useEffect } from 'react'
import { fetchDocumentData } from '../FirestoreFunctions/FirestoreRead';

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
                console.log("Getting data")
        } else { 
            console.log("Missed")
        }
    }, [dependency]);

    return {
        docData,
        isDocLoading,
        docError
    }

}