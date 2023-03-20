//firestore delete functions
import firestore from '@react-native-firebase/firestore';

export async function deleteUserSubcollection(userid) {
    console.log("deleting user appointments sub-collection")
    firestore().collection(`Users/${userid}/Appointments`).get()
}

export async function deleteUserDocument(collection, docId) {
    console.log("deleting document")
    return firestore().collection(`${collection}`).doc(`${docId}`).delete()
}

export function removeSlotFromMap(selectedSlot, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${selectedSlot}`]: firestore.FieldValue.delete(),
    }
    );
    console.log("Slot Field deleted")
}