import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import jwtDecode from 'jwt-decode';
// redux
import {dispatch} from '../store';
// utils
import {getData, postData, axiosInstance} from '../../utils/axios';
// endpoints
import {SEND_OTP_API,VERIFY_OTP_API} from '../../config';
// navigation
import Navigation from '../../navigation/Navigation';

// ----------------------------------------------------------------------

const initialState = {
  token: '',
  fcmTokken: '',
  loggedIn: false,
  isFirstLaunch: true,
  userInfo: {},
  sendOTP: {
    loading: false,
    error: null,
  },
  verifyOTP: {
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // sendOTP
    // ----------------------------------------------------------------------
    sendOTPLoading(state) {
      state.sendOTP.loading = true;
      state.verifyOTP.error = null;
    },
    sendOTPSuccess(state) {
      state.sendOTP.loading = false;
      state.verifyOTP.error = null;
    },
    sendOTPError(state, action) {
      state.sendOTP.loading = false;
      state.sendOTP.error = action.payload;
    },

    // verifyOTP
    // ----------------------------------------------------------------------

    verifyOTPLoading(state) {
      state.verifyOTP.loading = true;
      state.verifyOTP.error = null;
    },
    verifyOTPSuccess(state, {payload}) {
      return {
        ...state,
        token: payload['token'],
        loggedIn: true,
        isFirstLaunch: false,
        userInfo: jwtDecode(payload['token']),
        verifyOTP: {error: null, loading: false},
      };
    },
    verifyOTPError(state, action) {
      state.verifyOTP.loading = false;
      state.verifyOTP.error = action.payload;
    },

    // ---------------------------------------------------------------------

    setLogout(state) {
      delete axiosInstance.defaults.headers.common['authorization'];
      return {
        ...state,
        token: '',
        loggedIn: false,
        isNewUser: true,
        userInfo: {},
        fcmTokken: '',
      };
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setLoggedIn,
  setLogout,
} = slice.actions;

// ----------------------------------------------------------------------

export function sendOTP(data) {
  return async () => {
    dispatch(slice.actions.sendOTPLoading());
    // simulating api call
     setTimeout(()=>( 
      dispatch(slice.actions.sendOTPSuccess()),
      Navigation.navigate('otp', {mobileNo: parseInt(data.mobileNo)})
      ),4000) 

    /* try {
      await postData(SEND_OTP_API, data);
      dispatch(slice.actions.sendOTPSuccess());
      Navigation.navigate('otp', {mobileNo: parseInt(data.mobileNo)});
    } catch (error) {
      dispatch(slice.actions.sendOTPError(error));
      Toast.show({type: 'error', text1: "Something went wrong!"});
    } */
  };
}

// ----------------------------------------------------------------------

export function verifyOTP(data) {
  return async () => {
    dispatch(slice.actions.verifyOTPLoading());
     // simulating api call
     setTimeout(()=>( 
      dispatch(slice.actions.verifyOTPSuccess({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}))
      ),4000)

    /*try {
      const response = await postData(VERIFY_OTP_API, data);
      dispatch(slice.actions.verifyOTPSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.verifyOTPError(error.response.data));
      Toast.show({type: 'error', text1: error.response.data.message});
      console.log(error);
    }*/
  };
}

// ----------------------------------------------------------------------
