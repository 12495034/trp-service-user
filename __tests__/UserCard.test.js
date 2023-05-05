import React from 'react';
import renderer from 'react-test-renderer';
import UserCard from '../assets/components/UserCard';

describe('User Card Tests', () => {
    test('renders userCard component correctly wuth true values', () => {
        const tree = renderer.create(<UserCard
            proNouns={'He/Him'}
            firstName={'Gavin'}
            middleName={'James'}
            lastName={'Davis'}
            dob={'1983-01-01'}
            email={'testEmail@Email.com'}
            emailVerified={true}
            phoneNumber={123456}
            isAgreedTC={true}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders userCard component correctly with false values', () => {
        const tree = renderer.create(<UserCard
            proNouns={'He/Him'}
            firstName={'Gavin'}
            middleName={'James'}
            lastName={'Davis'}
            dob={'1983-01-01'}
            email={'testEmail@Email.com'}
            emailVerified={false}
            phoneNumber={123456}
            isAgreedTC={false}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});