//Firestore update functions
import firestore from '@react-native-firebase/firestore';

export function addSlotToMap(slot, time, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${slot}`]: time,
    });
}

export function updateDocumentGeneral(collection, doc, data) {
    return firestore()
        .collection(collection)
        .doc(doc)
        .update(data)
}