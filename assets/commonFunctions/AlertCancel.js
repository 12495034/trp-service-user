import { Alert } from "react-native"

export function AlertCancel(status, isCheckedIn, title, body, acceptText, rejectText, callbackAccept) {
    if (status == "Active" && isCheckedIn != true) {
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
                    onPress: () => console.log("Appointment not cancelled"),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => console.log("Alert cancelled by pressing outside box"),
            },
        );
    } else {
        console.log("Appointment is not active, therefore changes cannot be made")
    }
}