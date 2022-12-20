import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {Box, Image, KeyboardAvoidingView} from 'native-base';
import Toast from 'react-native-toast-message';
// redux
import {useSendOtpMutation} from '../../redux/apiSlices/userApi';

// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// components
import {RHFTextField} from '../../components/hook-form';
import AppButton from '../../components/button/AppButton';
import AppText from '../../components/text/AppText';
import Loader from '../../components/loader/Loader';

const Login = ({navigation}) => {
  const [sendOTP, {isLoading, isError, isSuccess}] = useSendOtpMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('otp', {mobileNo: parseInt(getValues('mobileNo'))});
    } else if (isError) {
      Toast.show({type: 'error', text1: 'Something went wrong!'});
    }
  }, [isError, isSuccess]);

  const MobileNoSchema = Yup.object().shape({
    mobileNo: Yup.string().matches(/^\d{10}$/, 'Phone number is not valid'),
  });

  const methods = useForm({
    resolver: yupResolver(MobileNoSchema),
    defaultValues: {
      mobileNo: '9876543210',
    },
  });

  const {control, getValues, handleSubmit} = methods;

  const onSubmit = data => {
    sendOTP({mobileNo: parseInt(data.mobileNo)});
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Box
          flex={1}
          bg={'background.50'}
          alignItems={'center'}
          justifyContent={'center'}
          px={'4'}>
          <Image
            source={require('./../../assets/images/login.png')}
            height={100}
            alt="2"
            mb={'10'}
          />
          <AppText fontWeight={600} fontSize={28}>
            Login
          </AppText>
          <AppText mb={'10'} mt={'1'}>
            Please enter your phone number
          </AppText>
          <RHFTextField
            name={'mobileNo'}
            label={'Enter Mobile Number'}
            control={control}
            keyboardType={'numeric'}
            maxLength={10}
            autoFocus={Platform.OS === 'android' ? false : true}
            placeholder="9868986898"
          />
        </Box>
        <AppButton
          isDisabled={isLoading}
          label={'Get OTP'}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
