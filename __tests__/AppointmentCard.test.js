import React from 'react';
import renderer from 'react-test-renderer';
import AppointmentCard from '../assets/components/AppointmentCard';

describe('Appointment card tests', () => {
    test('renders AppointmentCard component correctly', () => {
        const tree = renderer.create(<AppointmentCard
            clinicId={123456}
            tester={'Leo Lardie'}
            location={'Belfast'}
            center={'LGBT Center'}
            date={'3000-01-01'}
            time={'18:00'}
            slot={1}
            checkedIn={true}
            called={true}
            wasSeen={true}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});