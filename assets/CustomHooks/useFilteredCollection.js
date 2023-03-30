import React from 'react'
import { useState, useEffect } from 'react'
import { fetchFilteredCollection } from '../FirestoreFunctions/FirestoreRead';

export default function useFilteredCollection(collection, searchField, operator, searchValue) {
    //Hook state
    const [filteredCollectionData, setFilteredCollectionData] = useState([]);
    //rather than determining the size of the filtered collection use count() method as a new custom hook
    //the document arent downloaded and therefore do not add to the firestore read quota
    const [filteredCollectionSize, setFilteredCollectionSize] = useState(0)
    const [isFilteredCollectionLoading, setIsFilteredCollectionLoading] = useState(true);
    const [filteredCollectionError, setFilteredCollectionError] = useState('');

    useEffect(() => {
        if (collection) {

            if (searchValue == undefined) {
                searchValue = " "
            }

            fetchFilteredCollection(collection, searchField, operator, searchValue)
                .then(querySnapshot => {
                    let filteredCollectionDataArray = []
                    let combined = {}
                    setFilteredCollectionSize(querySnapshot.size)
                    if (querySnapshot.size > 0) {
                        querySnapshot.forEach((doc) => {
                            setFilteredCollectionError(null);
                            Object.assign(combined, { id: doc.id }, doc.data())
                            filteredCollectionDataArray.push(combined)
                        })
                    } else {
                        setFilteredCollectionError('Collection is empty or does not exist');
                    }
                    setFilteredCollectionData(filteredCollectionDataArray)
                    return false
                })
                .then((data) => setIsFilteredCollectionLoading(data))
                .catch((e) => {
                    setFilteredCollectionError(e.message)
                    setIsFilteredCollectionLoading(false)
                })
        }
    }, [searchValue]);

    return {
        filteredCollectionData,
        filteredCollectionSize,
        isFilteredCollectionLoading,
        filteredCollectionError
    }

}

