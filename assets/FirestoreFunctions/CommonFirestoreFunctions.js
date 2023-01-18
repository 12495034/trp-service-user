import firestore from '@react-native-firebase/firestore';

export function removeSlotFromMap(selectedSlot, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${selectedSlot}`]: firestore.FieldValue.delete(),
    }
    );
    console.log("Slot Field deleted")
}

export function addSlotToMap(slot, time, clinicId) {
    firestore().collection('Clinics').doc(`${clinicId}`).update({
        [`slots.${slot}`]: time,
    }
    );
    console.log("Slot Field added")
}