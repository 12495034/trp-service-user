//firestore delete functions
import firestore from '@react-native-firebase/firestore';

export async function deleteUserSubcollection(userid) {
    console.log("deleting user appointments sub-collection")
    var colRef = firestore().collection(`Users/${userid}/Appointments`)
    colRef
        .get()
        .then((querySnapshot) => {
            Promise.all(querySnapshot.docs.map((d) => d.ref.delete()));
            console.log("All appointments deleted")
        })
        .catch((e) => {
            console.log(e.message)
        })
}

export async function deleteUserDocument(userid) {
    console.log("deleting users document record")
    firestore()
        .collection('Users')
        .doc(`${userid}`)
        .delete()
        .then(() => {
            console.log('User document record deleted!');
        })
        .catch((e) => {
            console.log(e.message)
        })
}

export function removeSlotFromMap(selectedSlot, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${selectedSlot}`]: firestore.FieldValue.delete(),
    }
    );
    console.log("Slot Field deleted")
}