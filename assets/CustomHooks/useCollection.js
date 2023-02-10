import { useState, useEffect } from 'react'
import { fetchCollectionDocuments } from '../FirestoreFunctions/FirestoreRead';

export default function useCollection(collection, dependency) {
    //Hook state
    const [collectionData, setCollectionData] = useState([]);
    const [isCollectionLoading, setIsCollectionLoading] = useState(true);
    const [collectionError, setCollectionError] = useState('');

    useEffect(() => {
        if (collection!=undefined) {
            fetchCollectionDocuments(collection)
                .then(querySnapshot => {
                    let collectionDataArray = []
                        querySnapshot.forEach((doc) => {
                            let data = Object.assign({ id: doc.id }, doc.data())
                            collectionDataArray.push(data)
                            setCollectionError(null);
                        })
                    setCollectionData(collectionDataArray)
                    setIsCollectionLoading(false)
                })
                .catch((e) => {
                    setCollectionError(e.message)
                })
        }
    }, [dependency]);

    return {
        collectionData,
        isCollectionLoading,
        collectionError
    }

}

