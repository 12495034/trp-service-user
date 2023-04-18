import { Alert } from "react-native"

export function handleAlertInformation(title, message) {
    Alert.alert(title, message)
}

export function handleAlertDecision(title, body, acceptText, rejectText, callbackAccept, callbackReject) {
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
                onPress: () => callbackReject(),
                style: 'cancel',
            },
        ]);
    return true
}