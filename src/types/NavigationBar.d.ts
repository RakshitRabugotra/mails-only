// NavigationBar.d.ts

import { NativeModules } from 'react-native';

declare module 'react-native' {
  interface NativeModulesStatic {
    NavigationBar?: {
      /**
       * Sets the navigation bar color and icon style.
       * @param colorHex - A hex color string, e.g., "#ffffff"
       */
      setColor: (colorHex: string) => void;
    };
  }
}
