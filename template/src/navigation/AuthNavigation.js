import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// redux
import {useSelector} from '../redux/store';

// screens
import OnBoarding from '../screens/auth/OnBoarding.screen';
import Login from '../screens/auth/Login.screen';
import OTP from '../screens/auth/OTP.screen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const {isFirstLaunch} = useSelector(state => state.user);

  return (
    <Stack.Navigator initialRouteName={isFirstLaunch ? 'onBoarding' : 'login'}>
      <Stack.Screen
        name="onBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="otp" component={OTP} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
