const config = {
    "preset": "react-native",
    "setupFilesAfterEnv": [
      "./jest-setup-after-env.js"
    ],
    "setupFiles": ["./jest.setup.js"],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|react-native-paper|react-native-firebase|@react-native-firebase/firestore)',
        ],
  };
  
  module.exports = config;