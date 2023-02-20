import React from "react";
import Login from "../assets/screens/Login";
import { fireEvent, render, waitFor, cleanup } from "@testing-library/react-native";
import { AuthProvider } from "../assets/context/AuthProvider";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "../assets/Navigation/AuthStack";

//mocking out context
//https://doanan3736.medium.com/mocking-context-in-react-native-testing-360cbb35285d

afterEach(cleanup);

describe('Auth screen button navigation', () => {
    const AuthContextMock = {
        signIn: jest.fn(),
    };

    it('navigates to Reset screen on button press', () => {
        const push = jest.fn();
        const { getByTestId } = render(
            <AuthProvider value={AuthContextMock}>
                <Login navigation={{ push }} />
            </AuthProvider>
        );

        fireEvent.press(getByTestId('resetButton'));
        expect(push).toHaveBeenCalledWith('Reset');
    });

    it('navigates to new account screen on button press', () => {
        const push = jest.fn();
        const { getByTestId } = render(
            <AuthProvider value={AuthContextMock}>
                <Login navigation={{ push }} />
            </AuthProvider>
        );

        fireEvent.press(getByTestId('newAccountButton'));
        expect(push).toHaveBeenCalledWith('Signup');
    });
});

describe('Auth Stack', () => {
    const AuthContextMock = {
        signIn: jest.fn(),
    };

    it('renders the correct initial screen', async () => {
        const { getByText } = render(
            <AuthProvider value={AuthContextMock}>
                <NavigationContainer>
                    <AuthStack />
                </NavigationContainer>
            </AuthProvider>
        );
        await waitFor(() => getByText('Login'));
    });
});

