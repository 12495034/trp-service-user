import React from 'react';
import { render, cleanup, screen } from '@testing-library/react-native';
import Home from '../assets/screens/Home';
import { AuthContext } from '../assets/context/AuthProvider';

afterEach(cleanup);

test.skip('Welcome Screen Message', () => {
    const AuthMockContext = {
        user:{ displayName: "Tester" },
    } 
    render(
        <AuthContext.Provider value={AuthMockContext}>
            <Home />
        </AuthContext.Provider>
    );
    expect(screen.getByText("Welcome Tester")).toBeOnScreen;
});