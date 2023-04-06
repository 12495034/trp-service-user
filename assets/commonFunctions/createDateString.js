//create a date string of format eg. Sat March 18 2023
//arbitrary time of 09:00 used for creation of date string as time is not displayed
export function createDateString(date) {
    const dateObject = new Date(`${date}T09:00:00`);
    const dateString = dateObject.toDateString();
    return dateString
}