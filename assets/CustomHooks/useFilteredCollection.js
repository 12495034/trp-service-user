import React from 'react'
import { useState, useEffect } from 'react'
import { fetchFilteredCollection } from '../FirestoreFunctions/FirestoreRead';

export default function useFilteredCollection(collection, searchField, operator, searchValue) {
    //Hook state
    const [filteredCollectionData, setFilteredCollectionData] = useState([]);
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
        isFilteredCollectionLoading,
        filteredCollectionError
    }

}

