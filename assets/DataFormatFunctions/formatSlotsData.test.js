import { formatSlotsData } from './formatSlotData'

const sizeCorrect = 4 
const sizeIncorrect = 5
const clinicDate = "3000-01-01"
const data = {
    1: "17:00",
    2: "17:30",
    3: "18:00",
    4: "18:30"
}

test('recieves a map of appointment slots and converts the data into an array of objects {SlotId:1,time:"17:00"}', () => {
    expect(formatSlotsData(data, clinicDate)).toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                { slotid: "1", time: "17:00" },
            )
        ])
    );
});

test('recieves a map of appointment slots and converts the data into an array of objects {SlotId:2,time:"17:30"}', () => {
    expect(formatSlotsData(data, clinicDate)).toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                { slotid: "2", time: "17:30" },
            )
        ])
    );
});

test('recieves a map of appointment slots and converts the data into an array of objects {SlotId:3,time:"18:00"}', () => {
    expect(formatSlotsData(data, clinicDate)).toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                { slotid: "3", time: "18:00" },
            )
        ])
    );
});

test('recieves a map of appointment slots and converts the data into an array of objects {SlotId:4,time:"18:30"}', () => {
    expect(formatSlotsData(data, clinicDate)).toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                { slotid: "4", time: "18:30" },
            )
        ])
    );
});

test('recieves a map of appointment slots with a slot that is not contained in the original data input', () => {
    expect(formatSlotsData(data, clinicDate)).not.toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                { slotid: "5", time: "19:00" },
            )
        ])
    );
});

test('Check array size output is the same size as the dataset', () => {
    expect(formatSlotsData(data, clinicDate)).toHaveLength(sizeCorrect)
});

test('Check array size output is the same size as the dataset', () => {
    expect(formatSlotsData(data, clinicDate)).not.toHaveLength(sizeIncorrect)
});