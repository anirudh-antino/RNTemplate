import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  Box,
  Stack,
  Avatar,
  KeyboardAvoidingView,
  ScrollView,
  IconButton,
  Icon,
} from 'native-base';
// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// redux
import {useDispatch} from '../../redux/store';
import {setLogout} from '../../redux/slices/user';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// components
import {
  RHFTextField,
  RHFSelect,
  RHFTimePicker,
  RHFCheckbox,
  RHFAutoCompleteDropDown,
} from '../../components/hook-form';
import AppButton from '../../components/button/AppButton';
import TopBar from '../../components/tab-bar/TopBar';
// utils
import createAvatar from '../../utils/createAvatar';
// assets
import { states } from '../../assets/file/states';

const GENDER_DATA = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Rather not say',
    value: 'Rather not say',
  },
];

const Form = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      reset();
    });
    return unsubscribe;
  }, [props.navigation]);

  // form functions
  const FormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    time: Yup.string().required('Time is required'),
    state: Yup.string().required('State is required'),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: 'Anirudh',
      mobile: '',
      gender: 'Male',
      time: new Date(),
      state: '',
      isDaily: true,
    },
  });

  const {control, reset, setValue, handleSubmit} = methods;

  const onSubmit = data => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  return (
    <>
      <TopBar label={'Form'}>
        <IconButton
          position={'absolute'}
          right={4}
          variant={'ghost'}
          rounded="full"
          colorScheme={'secondary'}
          onPress={() => dispatch(setLogout())}
          icon={
            <Icon
              alignItems="center"
              justifyContent="center"
              size="6"
              as={MaterialCommunityIcons}
              name={'logout'}
            />
          }
        />
      </TopBar>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bg={'background.50'} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
          <Box flex={1} p={'4'}>
            <Stack space={2}>
              <Avatar bg={createAvatar('P').color} alignSelf={'center'}>
                {createAvatar('P').name}
              </Avatar>

              <RHFTextField
                name={'name'}
                label={'Name'}
                control={control}
                isRequired
              />

              <RHFTextField
                name={'mobile'}
                label={'Mobile Nummber'}
                control={control}
                keyboardType={'numeric'}
                maxLength={10}
              />

              <RHFSelect
                name={'gender'}
                label={'Gender'}
                control={control}
                isRequired
                selectData={GENDER_DATA}
              />
              <RHFTimePicker
                name={'time'}
                label={'Time'}
                control={control}
                isRequired
              />

              <RHFAutoCompleteDropDown
                name={'state'}
                label={'State'}
                control={control}
                dataSet={states}
                setValue={setValue}
                isRequired
              />

              <RHFCheckbox
                name={'isDaily'}
                label={'Daily'}
                control={control}
                defaultIsChecked
              />
            </Stack>
          </Box>
        </ScrollView>
        <AppButton
          isDisabled={loading}
          isLoading={loading}
          label={'Submit'}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default Form;
