//constants used throughout the source code can be altered here, review comments for description of constant usage
import { StyleSheet } from "react-native"

/**
 * Radio button selection colour
 */
export const radioButtonSelectColor = 'green'

/**
 * Radio button un-selected colour
 */
export const radioButtonUnselectedColor = 'red'

/**
 * Progress bar colour when progressing through booking screen
 */
export const progressBarColor = 'green'

/**
 * Defines the time allowed in seconds by the user to confirm their appointment slot before it is made available again
 */
export const timeLimit = 10 * 5.9

/**
 * defines the minimum number of hours before that users must cancel an appointment
 * it should be noted that slots that are available to book are a minimum of 24hrs away. Slots less than 24hrs away cannot be booked
 */
export const cancelLimit = 24

/**
 * default data used when creating a new appointment document in the Clinics Appointments subcollection
 * @param {String} selectedSlot slot id of the selected slot
 * @param {String} selectedTime time of the selected appointment slot
 * @returns Object Data used for new appointment creation
 * called: false,
        calledBy: "",
        checkedIn: false,
        wasSeen: false,
        slot: selectedSlot,
        time: selectedTime,
        status: "Active"
 */
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

/**
 * default data used when creating a new appointment document in the Users Appointments subcollection
 * @param {String} selectedSlot slot id of the selected slot
 * @param {String} selectedTime time of the selected appointment slot
 * @param {String} location Location of the test center eg. Belfast
 * @param {String} center test center
 * @param {String} addDetails Additional details added to free text field
 * @param {String} clinicAddress center address
 * @param {String} clinicPostcode center postcode
 * @param {String} date date of the clinic
 * @returns Object data used for new appointment creation
 * called: false,
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
 */
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

/**
 * Common button style used across mobile app
 */
export const buttonStyle = StyleSheet.create({
    MDLabel:{
        fontSize: 12, 
        height: 36, 
        textAlignVertical: 'center'
    }
})

