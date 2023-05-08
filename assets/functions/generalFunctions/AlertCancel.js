import { Alert } from "react-native"
/**
 * Function to display an alert when the use choses to cancel an appointment
 * @param {String} status Appointment status
 * @param {Boolean} isCheckedIn If the user is checked in for their current appointment
 * @param {String} title The title of the Alert
 * @param {String} body  The body of the Alert
 * @param {String} acceptText Text shown on the Accept button
 * @param {String} rejectText  Text shown on Reject button
 * @param {Function} callbackAccept function triggered by acceptance
 */
export function AlertCancel(status, isCheckedIn, title, body, acceptText, rejectText, callbackAccept) {
    if (isCheckedIn != true) {
        Alert.alert(
            title,
            body,
            [
                {
                    text: acceptText,
                    onPress: callbackAccept,
                    style: 'cancel',
                },
                {
                    text: rejectText,
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => {},
            },
        );
    } else {
        //console.log("Appointment is not active, therefore changes cannot be made")
    }
}