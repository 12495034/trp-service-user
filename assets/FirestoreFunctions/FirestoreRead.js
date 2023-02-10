import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

//fetch all documents in a collection, returns a promise
export function fetchCollectionDocuments(collection) {
    return firestore().collection(`${collection}`).get()
}

//fetch all documents in a collection based on , returns a promise
export function fetchFilteredCollection(collection, searchField, operator, searchValue) {
    console.log(collection, searchField, operator, searchValue)
    return firestore().collection(`${collection}`).where(`${searchField}`, `${operator}`, searchValue).get()
}


//fetch data for a specific document, returns a promise
export function fetchDocumentData(collection, doc) {
    return firestore().collection(`${collection}`).doc(`${doc}`).get()
}

//fetch data for a specific document, returns a promise
export function setDocListener(collection, doc) {
    return firestore().collection(`${collection}`).doc(`${doc}`)
}

//fetch data for a specific document, returns a promise
export function setCollectionListener(collection, filter) {
    console.log(collection, filter)
    return firestore().collection(`${collection}`).where('status', '==', `${filter}`);
}

