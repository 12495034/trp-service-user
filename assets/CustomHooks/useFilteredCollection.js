import { useState, useEffect } from 'react'
import { fetchFilteredCollection } from '../FirestoreFunctions/FirestoreRead';

//custom hook to return data from documents stored in a collection based on a filter criteria
export default function useFilteredCollection(collection, searchField, operator, searchValue) {
    const [filteredCollectionData, setFilteredCollectionData] = useState([]);
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
                })
                .then((data) => {
                    setIsFilteredCollectionLoading(false)
                })
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

