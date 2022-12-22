import React, {useState} from 'react';
import {Platform} from 'react-native';
import {Pressable, FormControl, Icon, Text, Box} from 'native-base';
import {Controller} from 'react-hook-form';
import {format} from 'date-fns';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RHFTimePicker({
  name,
  label,
  control,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  isBorderRadius = true,
  inputWidth = '100%',
  placeholder = '',
  ...other
}) {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    !isDisabled && setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

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
          <FormControl.Label
            _text={{
              fontWeight: '500',
              fontSize: '12',
            }}>
            {label}
          </FormControl.Label>
          <Pressable onPress={showTimePicker}>
            <Box
              borderWidth="1"
              p={Platform.OS === 'ios' ? '2' : '3'}
              borderRadius={isBorderRadius ? 8 : 0}
              borderColor={isDisabled ? 'coolGray.100' : 'coolGray.300'}
              {...other}>
              {value ? (
                <Text
                  fontFamily={'body'}
                  fontSize={14}
                  fontWeight={500}
                  color={isDisabled ? 'coolGray.400' : 'coolGray.900'}>
                  {format(new Date(value), 'dd/MM/yyyy')}
                </Text>
              ) : (
                <Text
                  fontFamily={'body'}
                  fontSize={14}
                  fontWeight={500}
                  color={'coolGray.400'}>
                  {placeholder}
                </Text>
              )}
            </Box>
          </Pressable>
          <DatePicker
            modal
            mode="date"
            maximumDate={new Date()}
            minimumDate={new Date('2021-01-01')}
            open={isTimePickerVisible}
            date={new Date()}
            onConfirm={v => {
              onChange(v);
              hideTimePicker();
            }}
            onCancel={hideTimePicker}
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
