import { Alert } from "react-native"

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