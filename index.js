import * as React from 'react';
import {AppRegistry} from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

//theme definition commented out as is working intermittently at present

// const theme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: 'tomato',
//       secondary: 'yellow',
//     },
//   };

export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
