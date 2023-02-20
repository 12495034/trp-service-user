const canCancel = require('./canCancel');

test('compares 14/02/2023 12:00pm and 15/02/2023 13:00pm and returns false ', () => {
    //dateTime difference of 25 hrs and therefore above time limit of 24, should return true
    dateTime1 = new Date(`2023-02-14T12:00:00Z`)
    dateTime2 = new Date(`2023-02-15T13:00:00Z`)
    expect(canCancel(dateTime1, dateTime2)).toBeTruthy()
});

test('compares 14/02/2023 12:00pm and 15/02/2023 11:00am and returns true ', () => {
    //dateTime difference of 23 hrs and therefore below time limit of 24, should return false
    dateTime3 = new Date(`2023-02-14T12:00:00Z`)
    dateTime4 = new Date(`2023-02-15T11:00:00Z`)
    expect(canCancel(dateTime3, dateTime4)).toBeFalsy()
});

test('compares 14/02/2023 12:00pm and 15/02/2023 12:00pm and returns true ', () => {

    //dateTime difference of 24hrs therefore equal to time limit of 24, should be true
    dateTime5 = new Date(`2023-02-14T12:00:00Z`)
    dateTime6 = new Date(`2023-02-15T12:00:00Z`)
    expect(canCancel(dateTime5, dateTime6)).toBeTruthy()
});

test('compares 15/02/2023 12:00pm and 14/02/2023 12:00pm and returns false ', () => {

    //dateTime difference of -24hrs therefore below limit of 24, should be false
    dateTime7 = new Date(`2023-02-15T12:00:00Z`)
    dateTime8 = new Date(`2023-02-14T12:00:00Z`)
    expect(canCancel(dateTime7, dateTime8)).toBeFalsy()
});
