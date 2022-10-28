import React from 'react';
import {Controller} from 'react-hook-form';
import {Input, FormControl, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RHFTextField({
  name,
  label,
  control,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isBorderRadius =true,
  inputWidth = '100%',
  ...other
}) {
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
          <FormControl.Label>{label}</FormControl.Label>
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            borderRadius={isBorderRadius?8:0}
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
