import firestore from '@react-native-firebase/firestore';

export function createDocument(collection, documentId, data) {
    return firestore().collection(collection).doc(documentId).set(data)
}