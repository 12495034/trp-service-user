import { useState, useEffect } from 'react'
import { fetchCollectionDocuments } from '../FirestoreFunctions/FirestoreRead';

/**
 * Custom hook used to perform one time data retrievel from firestore collection
 * @param {String} collection Firestore collection
 * @param {state variable} dependency Dependency passed to use effect dependency array
 * @returns Array of collectionData, Boolean or isCollectionLoading, String collectionError
 */
export default function useCollection(collection, dependency) {
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

