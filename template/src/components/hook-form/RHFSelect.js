import React from 'react';
import {Controller} from 'react-hook-form';
import {Select, FormControl, Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RHFSelect({
  name,
  label,
  control,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isBorderRadius = true,
  inputWidth = '100%',
  selectData,
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
          <Select
            selectedValue={value}
            onValueChange={onChange}
            accessibilityLabel={label}
            borderRadius={isBorderRadius ? 8 : 0}
            fontFamily={'body'}
            fontSize={14}
            fontWeight={500}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <Icon as={MaterialCommunityIcons} name="check" size={6} color={'white'}/>,
            }}
            {...other}>
            {selectData?.map((item, index) => (
              <Select.Item
                key={index}
                label={item?.label || null}
                value={item?.value || null}
              />
            ))}
          </Select>
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
