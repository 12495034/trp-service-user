import React from 'react';
import { render, cleanup, screen } from '@testing-library/react-native';
import Profile from '../assets/screens/Profile';
import { AuthContext } from '../assets/context/AuthProvider';
import useDocOnSnapshot from '../assets/CustomHooks/useDocOnSnapshot';

jest.mock('../assets/CustomHooks/useDocOnSnapshot');

afterEach(cleanup);

test('Welcome Screen Message', () => {
    const AuthMockContext = {
        logOut: jest.fn(),
        user: {
            displayName: "Tester",
            isVerified: true,
        },
        deleteUserAuth: jest.fn()
    }

    render(
        <AuthContext.Provider value={AuthMockContext}>
            <Profile />
        </AuthContext.Provider>
    );
    expect(screen.getByText("User Details")).toBeOnScreen;
});