//constants used throughout the source code can be altered here, review comments for description of constant usage

//Defines the time allowed in seconds by the user to confirm their appointment slot before it is made available again
export const timeLimit = 10 * 5.9

//defines the minimum number of hours before that users must cancel an appointment
//it should be noted that slots that are available to book are a minimum of 24hrs away. Slots less than 24hrs away cannot be booked
export const cancelLimit = 24

//default data used when creating a new appointment document in the Clinics Appointments subcollection
export function clinicAppointmentData(selectedSlot, selectedTime) {
    return {
        called: false,
        calledBy: "",
        checkedIn: false,
        wasSeen: false,
        slot: selectedSlot,
        time: selectedTime,
        status: "Active"
    }
}

//default data used when creating a new appointment document in the Users Appointments subcollection
export function userAppointmentData(selectedSlot, selectedTime, location, center, addDetails, clinicAddress, clinicPostcode, date) {
    return {
        called: false,
        calledBy: "",
        checkedIn: false,
        wasSeen: false,
        location: location,
        center: center,
        addDetails: addDetails,
        clinicAddress: clinicAddress,
        clinicPostcode: clinicPostcode,
        slot: selectedSlot,
        time: selectedTime,
        date: date,
        status: "Active"
    }
}