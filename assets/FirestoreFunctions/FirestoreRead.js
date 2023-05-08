import firestore from '@react-native-firebase/firestore';

/**
 * Function to fetch all documents within a collection
 * @param {String} collection Firestore Collection 
 * @returns Promise
 */
export function fetchCollectionDocuments(collection) {
    return firestore().collection(`${collection}`).get()
}

/**
 * Function to fetch all documents within a collection based on filter criteria
 * @param {String} collection Firestore Collection 
 * @param {String} searchField Firestore document field to be queried
 * @param {String} operator Firestore operator for query eg. ==
 * @param {String} searchValue value to be searched for
 * @returns Promise
 */
export function fetchFilteredCollection(collection, searchField, operator, searchValue) {
    return firestore().collection(`${collection}`).where(`${searchField}`, `${operator}`, searchValue).get()
}

/**
 * Function to fetch a specific firestore document based on a doc id
 * @param {String} collection Firestore Collection 
 * @param {String} doc Firestore Document 
 * @returns Promise
 */
export function fetchDocumentData(collection, doc) {
    return firestore().collection(`${collection}`).doc(`${doc}`).get()
}

/**
 * Function to set a real time listener on a specific firestore document based on a doc id
 * @param {String} collection Firestore Collection 
 * @param {String} doc Firestore Document 
 * @returns Promise
 */
export function setDocListener(collection, doc) {
    return firestore().collection(`${collection}`).doc(`${doc}`)
}

//fetch data for a specific document, returns a promise
/**
 * Function to set a real time listener on a collection based on filter criteria
 * @param {String} collection Firestore Collection
 * @param {String} field Firestore document field
 * @param {String} filter Value to filter by
 * @returns 
 */
export function setCollectionListener(collection, field, filter) {
    return firestore().collection(`${collection}`).where(`${field}`, '==', `${filter}`);
}

