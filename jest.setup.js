import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
//Mock netInfo Hook
jest.mock('@react-native-community/netinfo', () => ({
    useNetInfo: jest.fn()
}));
//Mock useDocOnSnapshot custom hook return value
jest.mock('module_name', () => ({
    useClientRect: () => [300, 200, jest.fn()]
}));

