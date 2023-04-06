//firestore delete functions
import firestore from '@react-native-firebase/firestore';

export async function deleteSubcollection(collectionName) {
    return firestore().collection(collectionName).get()
}

export async function deleteDocument(collection, docId) {
    return firestore().collection(`${collection}`).doc(`${docId}`).delete()
}

export function removeSlotFromMap(selectedSlot, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${selectedSlot}`]: firestore.FieldValue.delete(),
    }
    );
}