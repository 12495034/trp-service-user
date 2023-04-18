import React from 'react'
import firestore from '@react-native-firebase/firestore';

//returns appropriate firestore query syntax based on what data has been entered into the search fields
export default function searchLogic(collection, chosenLocation, chosenCenter, chosenDate, searchField, status) {

    var query = ""
    if (chosenLocation === true && chosenCenter === undefined && chosenDate !== undefined) {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)
            .where('date', '==', `${chosenDate}`)
    } else if (chosenCenter !== undefined && chosenDate === undefined) {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)
            .where('center', '==', `${chosenCenter}`)
    } else if (chosenCenter === undefined && chosenDate === undefined) {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)
    } else {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)
            .where('center', '==', `${chosenCenter}`)
            .where('date', '==', `${chosenDate}`)
    }
    return query
}
