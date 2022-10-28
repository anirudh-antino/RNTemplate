import React, {useRef, useState} from 'react';
import {VStack, Icon, IconButton, useTheme} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputCode from 'react-native-input-code';

export default function PinInput({code, setCode, onFullFill}) {
  const {colors} = useTheme();
  const inputCode = useRef(null);
  const [refresh, setRefresh] = useState(true);
  const onChangeCode = value => {
    setCode(value);
  };
  const getKeyboard = () => {
    setRefresh(false);
    setTimeout(() => {
      setRefresh(true);
    }, 100);
  };

  return (
    <VStack space="5" alignItems={'center'}>
      {refresh && (
        <InputCode
          code={code}
          length={6}
          ref={inputCode}
          onChangeCode={onChangeCode}
          onFullFill={onFullFill}
          autoFocus
          codeTextStyle={{
            color: colors.black,
          }}
          codeContainerStyle={{
            borderWidth: 2,
            marginHorizontal: 5,
            borderRadius: 10,
            borderColor: colors.background[900],
          }}
          codeContainerCaretStyle={{
            borderWidth: 2,
            marginHorizontal: 5,
            borderRadius: 10,
            borderColor: colors.secondary[50],
          }}
        />
      )}
      <IconButton
        borderRadius={16}
        onPress={getKeyboard}
        icon={
          <Icon
            as={MaterialIcons}
            color={'secondary.50'}
            name="keyboard"
            size="lg"
          />
        }
      />
    </VStack>
  );
}
