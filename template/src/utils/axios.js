import axios from 'axios';
import Toast from 'react-native-toast-message';
// config
import {BASE_URL} from '../config';
// redux
import {store} from '../redux/store';
import {setLogout} from '../redux/slices/user';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 25 * 1000,
  timeoutErrorMessage: 'Something is wrong! Please check your connection',
});

// ----------------------------------------------------------------------

const getData = async (endPoint, data) => {
  const {
    user: {token},
  } = store.getState();
  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `bearer ${token}`;
  }
  try {
    const result = await axiosInstance.get(endPoint, data);
    if (result && result.data?.status) {
      console.log(result.data); //console response of every request
      return result;
    } else {
      Toast.show({type: 'error', text1: 'Something went wrong!'});
      store.dispatch(setLogout()); // logout if token expired
    }
  } catch (error) {
    console.log(error); // log any error
    throw error;
  }
};

// ----------------------------------------------------------------------

const postData = async (endPoint, data, formData = false) => {
  const {
    user: {token},
  } = store.getState();
  let headers = {};
  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `bearer ${token}`;
  }
  if (formData) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  }
  console.log(BASE_URL + endPoint);
  console.log(data); //console data posted of every request
  try {
    const result = await axiosInstance.post(endPoint, data, {
      headers: headers,
    });

    if (result && result.data?.status) {
      console.log(result.data); //console response of every request
      return result;
    } else {
      Toast.show({type: 'error', text1: 'Something went wrong!'});
      store.dispatch(setLogout()); // logout if token expired
    }
  } catch (error) {
    console.log(error); // log any error
    throw error;
  }
};

// ----------------------------------------------------------------------

export {getData, postData, axiosInstance};
