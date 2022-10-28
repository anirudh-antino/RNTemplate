import { extendTheme, theme as nbTheme } from 'native-base';
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
	useSystemColorMode: false,
	initialColorMode: "light",
  };

export const customTheme = extendTheme({
  config,
  colors: {
    background: {
      50: 'rgb(255, 255, 255)', // background color
      100: 'rgb(255, 255, 255)',
      200: 'rgb(252, 252, 252)',
      300: 'rgb(249, 249, 249)',
      400: 'rgb(245, 245, 245)',
      500: 'rgb(242, 242, 242)',
      600: 'rgb(239, 239, 239)',
      700: 'rgb(235, 235, 235)',
      800: 'rgb(232, 232, 232)',
      900: 'rgb(229, 229, 229)',
    },
    secondary: {
      50: '#097FFB',// secondary color
      100: '#09E7F2',
      200: '#09D7F2',
      300: '#09C7F2',
      400: '#09B7F2',
      500: '#09A3F2',
      600: '#097FFB',
      700: '#0989F2',
      800: '#0979F2',
      900: '#0969F2',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
  },
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter-Thin',
      },
      200: {
        normal: 'Inter-ExtraLight',
      },
      300: {
        normal: 'Inter-Light',
      },
      400: {
        normal: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-SemiBold',
      },
      700: {
        normal: 'Inter-Bold',
      },
      800: {
        normal: 'Inter-ExtraBold',
      },
      900: {
        normal: 'Inter-Black',
      },
    },
  },
});


export const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        return "light";
      }
    },
    set: async (value) => {
      try {
        await AsyncStorage.setItem("@color-mode", value);
      } catch (e) {
        console.log(e);
      }
    },
  };
