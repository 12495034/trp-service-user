import { Alert } from "react-native"

export function handleAlertInformation(title, message) {
    Alert.alert(title, message)
}