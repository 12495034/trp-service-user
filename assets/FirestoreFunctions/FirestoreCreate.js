import firestore from '@react-native-firebase/firestore';

/**
 * Function to create a new firestore document within a collection with a pre-defined id
 * @param {String} collection Firestore collection
 * @param {String} documentId chosen document id
 * @param {Object} data Document data to be stored
 * @returns 
 */
export function createDocument(collection, documentId, data) {
    return firestore().collection(collection).doc(documentId).set(data)
}