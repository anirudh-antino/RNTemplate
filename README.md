# React Native Template With NativeBase

## Usage

```sh
npx react-native init SomeApp --template https://github.com/anirudh-antino/RNTemplate.git
```

### Note on the legacy CLI

There seems to be quite some confusion about the legacy CLI. This template only works with the new CLI. Make sure you have uninstalled the legacy `react-native-cli` first (`npm uninstall -g react-native-cli`), for the below command to work. If you wish to not use `npx`, you can also install the new CLI globally (`npm i -g @react-native-community/cli` or `yarn global add @react-native-community/cli`).

Further information can be found here: https://github.com/react-native-community/cli#about

## What's inside

- UI/UX Design components from [NativeBase](https://docs.nativebase.io/?utm_source=HomePage&utm_medium=header&utm_campaign=NativeBase_3)
- Redux, [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) for state management 
- [React Navigation](https://reactnavigation.org/docs/getting-started/) for simple navigation also includes custom bottom tab
- Performant, flexible and extensible forms with easy-to-use validation using [React Hook Form](https://react-hook-form.com/get-started)
- [Yup](https://www.npmjs.com/package/yup) to build schema for value parsing and validation
- Includes example screens. [On Boarding](https://github.com/anirudh-antino/RNTemplate/blob/main/template/src/screens/auth/OnBoarding.screen.js), Authentication with [mobile](https://github.com/anirudh-antino/RNTemplate/blob/main/template/src/screens/auth/Login.screen.js) / [otp](https://github.com/anirudh-antino/RNTemplate/blob/main/template/src/screens/auth/OTP.screen.js) and a [Form](https://github.com/anirudh-antino/RNTemplate/blob/main/template/src/screens/form-screen/Form.screen.js) screen.
- Includes [Vector Icons](https://www.npmjs.com/package/react-native-vector-icons). Perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project. 

## How to customize theme
- Just navigate to `project/src/theme/customeTheme.js` and make the desired changes.[example file](https://github.com/anirudh-antino/RNTemplate/blob/main/template/src/theme/customTheme.js)
- You can change colors, fonts, initial color mode(dark/light) etc.
- [see more theme options](https://docs.nativebase.io/customizing-theme) 


