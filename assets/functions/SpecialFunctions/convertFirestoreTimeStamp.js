/**
 * Function to convert firestore timestamp to date and time string
 * @param {Timestamp} timeStamp Firestore Timestamp
 * @returns String date
 */
export function convertFirestoreTimeStamp(timeStamp){
    if(timeStamp){
      const fireBaseTime = new Date(
        timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000,
      );
      const date = fireBaseTime.toDateString();
      const atTime = fireBaseTime.toLocaleTimeString();
      return `${date}`
    }
    return "Unknown Time"
    }