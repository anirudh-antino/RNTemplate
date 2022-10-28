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
  ...other
}) {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    !isDisabled &&setTimePickerVisibility(true);
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
          <FormControl.Label>{label}</FormControl.Label>
          <Pressable onPress={showTimePicker}>
            <Box
              borderWidth="1"
              p={Platform.OS === 'ios' ? '1' : '3'}
              borderRadius={isBorderRadius?8:0}
              borderColor={isDisabled?"coolGray.100":"coolGray.300"}
              {...other}>
              <Text fontFamily={'body'} fontSize={14} fontWeight={500} color={isDisabled?"coolGray.400":"coolGray.900"}>
                {format(new Date(value), 'hh:mm  a')}
              </Text>
            </Box>
          </Pressable>
          <DatePicker
            modal
            mode="time"
            open={isTimePickerVisible}
            date={new Date()}
            onConfirm={(v)=>{
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
