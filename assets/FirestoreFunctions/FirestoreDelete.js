//firestore delete functions
import firestore from '@react-native-firebase/firestore';

/**
 * Function to remove an available appointment slot from a clinic documents slots map
 * @param {String} selectedSlot Selected appointment slot
 * @param {String} clinicId id of the clinic
 */
export function removeSlotFromMap(selectedSlot, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${selectedSlot}`]: firestore.FieldValue.delete(),
    }
    );
}