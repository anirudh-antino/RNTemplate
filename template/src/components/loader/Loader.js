import React from 'react';
import {Spinner} from 'native-base';
import {View} from 'react-native';

const Loader = ({isLoading=false}) => {
  return (
    <>
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
          }}>
          <Spinner size="lg" color="secondary.500" />
        </View>
      ) : null}
    </>
  );
};

export default Loader;
