import React, {useEffect, useState} from 'react';
import {Slide, Alert, HStack} from 'native-base';
import NetInformation from '@react-native-community/netinfo';
import AppText from '../../components/text/AppText';

const NetInfo = props => {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInformation.addEventListener(state => {
      if (!state.isConnected) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setInterval(() => checkNetwork(), 2000);
  }, []);

  const checkNetwork = () => {
    NetInformation.refresh().then(state => {
      if (!state.isConnected) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });
  };

  return !showAlert ? null : (
    <Slide in={showAlert} placement="top">
      <Alert justifyContent="center" status="error" safeAreaTop={8}>
        <HStack space={2} justifyContent="center" alignItems={'center'}>
          <Alert.Icon />
          <AppText color="error.500" fontWeight="medium">
            No Internet Connection
          </AppText>
        </HStack>
      </Alert>
    </Slide>
  );
};
export default NetInfo;
