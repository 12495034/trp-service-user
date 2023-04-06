import { useState, useEffect } from 'react'
import { setDocListener } from '../FirestoreFunctions/FirestoreRead';

//Custom hook to retrieve document data
//Real time updates
export default function useDocOnSnapshot(collection, doc, dependency) {
    //Hook state
    const [docData, setDocData] = useState({});
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        if (collection) {
            const subscriber = setDocListener(collection, doc)
                .onSnapshot(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        setDocData(documentSnapshot.data())
                        setIsDocLoading(false)
                    } else {
                        setDocError("Document does not exist");
                        setIsDocLoading(false)
                    }
                });
            // Stop listening for updates when no longer required
            return () => subscriber();
        }
    }, [dependency]);

    return {
        docData,
        isDocLoading,
        docError
    }

}

