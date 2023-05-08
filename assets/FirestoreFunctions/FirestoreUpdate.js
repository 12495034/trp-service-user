//Firestore update functions
import firestore from '@react-native-firebase/firestore';

/**
 * Function to add an available appointment slot to a clinic documents slots map
 * @param {String} slot slot id to be added
 * @param {String} time time of the appointment slot to be added
 * @param {String} clinicId The id of the clinic being modified
 */
export function addSlotToMap(slot, time, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${slot}`]: time,
    });
}

/**
 * Function to perform an update to a documents data
 * @param {String} collection Firestore Collection
 * @param {String} doc Firestore Document
 * @param {Object} data Data used to updated the document
 * @returns Promise
 */
export function updateDocumentGeneral(collection, doc, data) {
    return firestore()
        .collection(collection)
        .doc(doc)
        .update(data)
}