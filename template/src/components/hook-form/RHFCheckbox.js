import React from 'react';
import {Checkbox, FormControl, Icon} from 'native-base';
import {Controller} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RHFCheckbox({
  name,
  label,
  control,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  inputWidth = '100%',
  ...other
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <FormControl
          mt={'4'}
          w={inputWidth}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isInvalid={!!error}
          isReadOnly={isReadOnly}>
          <FormControl.Label>{label}</FormControl.Label>
          <Checkbox
            colorScheme={'secondary'}
            value={value}
            onChange={onChange}
            {...other}>
            {label}
          </Checkbox>

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
