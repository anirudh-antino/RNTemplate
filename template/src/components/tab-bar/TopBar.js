import React from 'react';
import {HStack, IconButton, Icon, Box, Spacer} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Navigation from '../../navigation/Navigation';
import AppText from '../text/AppText';

export default function TopBar({label, children, canGoBack = true}) {
  return (
    <>
      <Box safeAreaTop bg={'background.50'} />
      <Box px={"2"} flexDirection={'row'} justifyContent={'center'} alignItems="center" bg={'background.100'}>
        {canGoBack && (
          <IconButton
           position={'absolute'}
           left={4}
            variant="unstyled"
            onPress={() => Navigation.goback()}
            icon={
              <Icon
                alignItems="center"
                justifyContent="center"
                size="6"
                as={AntDesign}
                name="arrowleft"
              />
            }
          />
        )}
        <AppText textAlign={'center'} fontSize={16} fontWeight={600}>
          {label}
        </AppText>
        {children}
      </Box>
    </>
  );
}
