import { Alert } from "react-native"

/**
 * Function for general Alerts
 * @param {String} title Alert Title
 * @param {String} message Alert message
 */
export function handleAlertInformation(title, message) {
    Alert.alert(title, message)
}

/**
 * Function used when user choses to cancel booking request at confirmation screen
 * @param {String} title Title of Alert
 * @param {String} body Body of Alert
 * @param {String} acceptText Acceptance button text
 * @param {String} rejectText Rejection button text
 * @param {function} callbackAccept Function called by acceptance eg. booking request cancelled
 * @returns true
 */
export function handleAlertDecision(title, body, acceptText, rejectText, callbackAccept) {
    Alert.alert(
        title,
        body,
        [
            {
                text: acceptText,
                onPress: () => callbackAccept(),
                style: 'accept',
            },
            {
                text: rejectText,
                // onPress: () => callbackReject(),
                style: 'cancel',
            },
        ]);
    return true
}