import { Alert } from "react-native"

export function handleAlertInformation(title, message) {
    Alert.alert(title, message)
}

export function handleAlertDecision(title,body,callbackAccept, callbackReject) {
    Alert.alert(
        title,
        body,
        [
            {
                text: 'Yes',
                onPress: callbackAccept,
                style: 'accept',
            },
            {
                text: 'No',
                onPress: callbackReject,
                style: 'cancel',
            },
        ]);
}