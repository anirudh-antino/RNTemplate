import { combineReducers } from 'redux';
import storage from '@react-native-async-storage/async-storage';

// slices
import userReducer from './slices/user';
// apiSlices
import {userApi} from './apiSlices/userApi';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],// 'user' add 'user' in this array to make it persist
};
const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer
});

export { rootPersistConfig, rootReducer };
