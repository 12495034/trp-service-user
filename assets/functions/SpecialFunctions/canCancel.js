import { cancelLimit } from '../../constants/Constants';

//calculate the full number of hours between two dates
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
