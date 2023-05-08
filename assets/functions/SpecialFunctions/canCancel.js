import { cancelLimit } from '../../constants/Constants';

/**
 * Function to determine if an appointment is within the cancellation window
 * @param {String} dateTime1 Typically the current date
 * @param {String} dateTime2 The date of the clinic
 * @returns true if date difference is > than the cancelLimit and false if the date difference is < than the cancel Limit
 */
export function canCancel(dateTime1, dateTime2) {
    //calculate milliseconds between two dateTime stamps
    var diff = (dateTime2.getTime() - dateTime1.getTime()) / 1000;
    diff /= (60 * 60);
    if (diff >= cancelLimit) {
        return true
    } else {
        return false
    }
}

module.exports = canCancel
