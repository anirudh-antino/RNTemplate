import {createSlice} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
// ----------------------------------------------------------------------

const initialState = {
  token: '',
  fcmTokken: '',
  loggedIn: false,
  isFirstLaunch: true,
  userInfo: {},
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn(state, {payload}) {
      return {
        ...state,
        token: payload['access_token'],
        loggedIn: true,
        isFirstLaunch: false,
        userInfo: jwtDecode(payload['access_token']),
      };
    },
    // ---------------------------------------------------------------------
    setLogout(state) {
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