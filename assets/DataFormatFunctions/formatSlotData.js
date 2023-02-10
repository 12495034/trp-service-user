
export function formatSlotsData(slotsData) {
    //need to clear selected slot on every render so that its not possible to select a slot that has been booked
    const appointmentList = [];
    // need to ensure that the server has returned the required data before preformating the data so that it can be rendered
    if (slotsData != undefined) {
        const size = Object.keys(slotsData).length
        for (let i = 0; i < size; i++) {
            let slotid = Object.keys(slotsData)[i];
            let time = Object.values(slotsData)[i];
            appointmentList.push({
                slotid: slotid,
                time: time
            });
        }
        return appointmentList
    } else { 

    }
}