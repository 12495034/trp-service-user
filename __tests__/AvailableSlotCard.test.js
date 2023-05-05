import React from 'react';
import renderer from 'react-test-renderer';
import AvailableSlotCard from '../assets/components/AvailableSlotCard';

describe('Available Slot Tests', () => {
    test('renders AppointmentCard component correctly', () => {
        const tree = renderer.create(<AvailableSlotCard
            active={true}
            clinicId={123456}
            slotId={1}
            time={'18:00'}
            selectedTime={'18:00'}
            selectedSlot={1}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});