//Firestore update functions
import firestore from '@react-native-firebase/firestore';

export function addSlotToMap(slot, time, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${slot}`]: time,
    });
    console.log("Slot Field added")
}

// export function updateDocument(collection, doc, data) {
//     console.log("data:", data)
//     return firestore()
//         .collection(`Users`)
//         .doc(`${doc}`)
//         .update({
//             ProNouns: data.ProNouns,
//             FirstName: data.FirstName,
//             MiddleName: data.MiddleName,
//             LastName: data.LastName,
//             dob: data.dob,
//             PhoneNumber: data.PhoneNumber,
//             email: data.email,
//             emailOptIn: data.emailOptIn,
//             isAgreedTC: data.isAgreedTC,
//         })
// }

export function updateDocumentGeneral(collection, doc, data) {
    console.log("Running update function general", collection, doc, data)
    return firestore()
        .collection(collection)
        .doc(doc)
        .update(data)
}