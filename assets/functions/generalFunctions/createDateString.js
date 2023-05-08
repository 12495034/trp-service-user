/**
 * Function to create a long format date string for an input date String of format YYYY-MM-DD
 * @param {String} date 
 * @returns String dateString eg. Sat March 18 2023
 */
export function createDateString(date) {
    const dateObject = new Date(`${date}T09:00:00`);
    const dateString = dateObject.toDateString();
    return dateString
}