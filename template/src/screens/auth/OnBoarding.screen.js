import React,{ useRef, useState } from 'react';
import { Image, View, Box, useTheme, PresenceTransition, Text } from 'native-base';
import Onboarding from 'react-native-onboarding-swiper';

// components
import AppButton from '../../components/button/AppButton';

const images = [
    {src: require('./../../assets/images/onBoard1.png'), imageHeight: 200},
    {src: require('./../../assets/images/onBoard2.png'), imageHeight: 200},
    {src: require('./../../assets/images/onBoard3.png'), imageHeight: 200},
  ];
  
  const OnBoarding = (props) => {
    const onboardingRef = useRef(null);
    const [page,setPage]=useState(0);
    const { colors } = useTheme();
    const handleNext=()=>{
      if(page<2){
        onboardingRef.current.goNext()
      }else{
        props.navigation.navigate('login')
      }
    }
    const handleSkip=()=>{
      props.navigation.navigate('login')
    }  
    const pages =[
        {
          backgroundColor: colors.white,
          image: <Image source={images[0].src} height={images[0].imageHeight} alt="0"/>,
          title: 'Title',
          subtitle: 'Subtitle',
          titleStyles: { fontWeight: 'bold' },
          subTitleStyles: { color:'#6E6E6E' }
        },
        {
          backgroundColor: colors.white,
          image: <Image source={images[1].src} height={images[1].imageHeight} alt="1"/>,
          title: 'Title',
          subtitle: 'Subtitle',
          titleStyles: { fontWeight: 'bold' },
          subTitleStyles: { color:'#6E6E6E' }
        },
        {
          backgroundColor: colors.white,
          image: <Image source={images[2].src} height={images[2].imageHeight} alt="2" />,
          title: 'Title',
          subtitle: 'Subtitle',
          titleStyles: { fontWeight: 'bold' },
          subTitleStyles: { color:'#6E6E6E' }
        },
      ]
    return (
      <>
        <Box safeAreaTop bg={"background.50"}/>
        <Box bg={colors.white} alignItems={'flex-end'}>
        <Text  mr={"8"} mt={"4"} color='#6E6E6E' fontSize={'md'}  onPress={handleSkip}>Skip</Text>
        </Box>
        <Onboarding
        ref={onboardingRef}
        bottomBarHighlight={false}
        bottomBarHeight={40}
        DotComponent={Square}
        showSkip={false}
        showNext={false}
        showDone={false}
        pageIndexCallback={(v)=>setPage(v)}
        pages={pages}
        containerStyles={{paddingBottom:100}}
        />
      <AppButton
        label={page<2 ? 'Next' : 'Get Started'}
        onPress={handleNext} 
       />
    </>    
    );            
  }

  export default OnBoarding;

  const Square = ({ selected }) => {
    return (
        <>
        {selected?<PresenceTransition 
        visible={selected} 
        initial={{
            opacity: 0,
            scale: 0,
          }} 
        animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 500,
            }
          }}>
        <View
            style={{
                width: selected ? 16 : 6,
                height: 6,
                borderRadius:10,
                marginHorizontal: 3,
                backgroundColor:selected ? '#097FFB' : 'rgba(0, 0, 0, 0.3)',
              }}       
            />
        </PresenceTransition>
        :<View
        style={{
            width: selected ? 12 : 6,
            height: 6,
            borderRadius:10,
            marginHorizontal: 3,
            backgroundColor:selected ? '#097FFB' : 'rgba(0, 0, 0, 0.3)',
          }}       
        />}
        </>
    );
  };