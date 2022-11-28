import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {Input, FormControl, Icon, Box} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppText from '../text/AppText';

export default function RHFAutoCompleteDropDown({
  name,
  label,
  control,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isBorderRadius = true,
  inputWidth = '100%',
  keyboardType = 'default',
  setValue,
  dataSet,
  ...other
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [val, setVal] = useState(null);

  const handleChange = v => {
    setVal(v);
    setValue(name, '');
    if (v == null || v == '') {
      setSuggestions([]);
    } else {
      setSuggestions(
        dataSet
          .filter(one => {
            if (one.name !== null) {
              return one.name
                .toLocaleLowerCase()
                .includes(v.toLocaleLowerCase());
            }
          })
          .slice(0, 4),
      );
    }
  };

  const handlePress = v => {
    setVal(v);
    setSuggestions([]);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <FormControl
          mt={'4'}
          w={inputWidth}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isInvalid={!!error}
          isReadOnly={isReadOnly}>
          {suggestions.length > 0 && (
            <Box
              position={'absolute'}
              bottom={38}
              zIndex={99}
              width={'100%'}
              bg={'white'}
              borderWidth={1}
              borderColor={'coolGray.300'}
              p={2}
              borderRadius={8}>
              {suggestions.map((item,i) => (
                <AppText
                key={i}
                  my={1}
                  onPress={() => (onChange(item.name), handlePress(item.name))}>
                  {item.name}
                </AppText>
              ))}
            </Box>
          )}
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            onChangeText={handleChange}
            onBlur={onBlur}
            keyboardType={keyboardType}
            borderRadius={isBorderRadius ? 8 : 0}
            value={val}
            {...other}
            fontFamily={'body'}
            fontSize={14}
            fontWeight={500}
            _focus={
              !!error
                ? {borderColor: 'danger.500'}
                : {borderColor: 'secondary.50'}
            }
          />
          <FormControl.ErrorMessage
            leftIcon={
              <Icon
                as={<MaterialIcons name="warning" />}
                size={4}
                color="danger.500"
              />
            }>
            {error?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
}
