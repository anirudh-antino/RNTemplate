import React, {useState, useEffect} from 'react';
import {Box, HStack, Link, Image} from 'native-base';
// redux
import {
  useVerifyOtpMutation,
  useSendOtpMutation,
} from '../../redux/apiSlices/userApi';
import {useDispatch} from '../../redux/store';
import {setLoggedIn} from '../../redux/slices/user';

// toast
import Toast from 'react-native-toast-message';

// components
import AppButton from '../../components/button/AppButton';
import TopBar from '../../components/tab-bar/TopBar';
import PinInput from '../../components/input/PinInput';
import AppText from '../../components/text/AppText';
import Loader from '../../components/loader/Loader';

export default function OTP(props) {
  const dispatch = useDispatch();
  const {mobileNo} = props.route.params;
  const [verify, {isLoading, isError, isSuccess, data}] = useVerifyOtpMutation();
  const [sendOTP, result] = useSendOtpMutation();

  const [code, setCode] = useState('');
  const [remainingTime, setRemainingTime] = useState('01:00');
  const [expireTime, setExpireTime] = useState(60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoggedIn(data.data));
    } else if (isError) {
      Toast.show({type: 'error', text1: 'Something went wrong!'});
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        let newTime = expireTime - 1;
        let min = Math.floor(newTime / 60);
        let sec = Math.floor(newTime % 60);
        let expTime =
          (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec);
        setExpireTime(newTime);
        setRemainingTime(expTime);
      }, 1000);
    } else if (!isActive && expireTime !== 0) {
      clearInterval(interval);
    }
    if (expireTime == 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, expireTime]);


  const resend = () => {
    if (!isActive) {
      reset();
      sendOTP({mobileNo});
      Toast.show({
        type: 'info',
        text1: `OTP Sent to ${mobileNo}`,
      });
    }
  };

  const reset = () => {
    setExpireTime(60);
    setRemainingTime('01:00');
    setIsActive(true);
  };

  const handleVerify = async code => {
    if (code) {
      try {
        verify({mobileNo, otp: parseInt(code)});
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: `Invalid code!`,
        });
      }
    }
  };

  return (
    <>
      <TopBar />
      <Loader isLoading={isLoading} />
      <Box
        flex={1}
        bg={'background.50'}
        alignItems={'center'}
        justifyContent={'center'}
        px={'4'}>
        <Image
          source={require('./../../assets/images/login2.png')}
          height={100}
          alt="2"
          mb={'10'}
        />
        <AppText fontWeight={600} fontSize={28}>
          OTP
        </AppText>
        <HStack mt={'1'} mb={'10'}>
          <AppText>Enter the OTP send to </AppText>
          <AppText fontWeight={600}>{mobileNo}</AppText>
        </HStack>
        <PinInput code={code} setCode={setCode} onFullFill={handleVerify} />
        <Link
          onPress={() => props.navigation.goBack()}
          _text={{
            color: 'secondary.50',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
          Edit Phone Number?
        </Link>
      </Box>
      {isActive && (
        <HStack bg={'background.50'} justifyContent={'center'}>
          <AppText>Resend OTP in</AppText>
          <Link _text={{textDecoration: 'none'}}>
            {' '}
            {remainingTime + ' sec'}
          </Link>
        </HStack>
      )}
      {!isActive && (
        <HStack bg={'background.50'} justifyContent={'center'}>
          <AppText> Didn’t receive the OTP? </AppText>
          <Link
            onPress={resend}
            _text={{
              color: 'secondary.50',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
            {' '}
            RESEND OTP
          </Link>
        </HStack>
      )}
      <AppButton
        isDisabled={isLoading}
        label={'Verify'}
        onPress={() => handleVerify(code)}
      />
    </>
  );
}
