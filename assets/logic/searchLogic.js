import React from 'react'
import firestore from '@react-native-firebase/firestore';

/**
 * Function used to build firestore query syntax based on what data has been entered into the search fields
 * queries do not accept null as argument to .where(). As such logic was applied to build the required query syntax.
 * @param {String} collection Firestore Collection
 * @param {String} chosenLocation Chosen test location eg. Belfast
 * @param {String} chosenCenter Chosen test center
 * @param {String} chosenDate chosen test date
 * @param {String} searchField Firestore document field
 * @param {String} status clinic document status eg. Active
 * @returns Firestore Query
 */
export default function searchLogic(collection, chosenLocation, chosenCenter, chosenDate, searchField, status) {

    var query = ""
    // if only location is defined, query clinics by location only
    if (chosenLocation !== undefined && chosenCenter === undefined && chosenDate === undefined) {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)

        //If location and center are selected, query by location and center only
    } else if (chosenLocation !== undefined && chosenCenter !== undefined && chosenDate === undefined) {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)
            .where('center', '==', `${chosenCenter}`)
        //if location and date are selected, query by location and date only
    } else if (chosenLocation !== undefined && chosenCenter === undefined && chosenDate !== undefined) {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)
            .where('date', '==', `${chosenDate}`)
        //else query by all inputs
    } else {
        query = firestore().collection(`${collection}`).where(`${searchField}`, '==', `${status}`)
            .where('location', '==', `${chosenLocation}`)
            .where('center', '==', `${chosenCenter}`)
            .where('date', '==', `${chosenDate}`)
    }
    return query
}
