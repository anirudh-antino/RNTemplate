import { combineReducers } from 'redux';
import storage from '@react-native-async-storage/async-storage';

// slices
import userReducer from './slices/user';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],// 'user' add 'user' in this array to make it persist
};
const rootReducer = combineReducers({
  user: userReducer,
});

export { rootPersistConfig, rootReducer };
