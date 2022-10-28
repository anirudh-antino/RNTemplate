import React from "react";
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';

// app screens
import Form from "../screens/form-screen/Form.screen";

const AppStack = createStackNavigator();

const AppNavigation = () => {
  return(
    <AppStack.Navigator
      initialRouteName="App"
      screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
        <AppStack.Screen
          name="App"
          component={Form}
        />

    </AppStack.Navigator>)
};


export default AppNavigation;