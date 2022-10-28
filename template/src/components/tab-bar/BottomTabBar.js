import React, {useState, useRef} from 'react';
import {Keyboard} from 'react-native';
import {Box, Icon, PresenceTransition, Text} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function BottomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);
  keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () =>
    setTabBarVisible(false),
  );
  keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () =>
    setTabBarVisible(true),
  );

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <PresenceTransition
      visible={tabBarVisible}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 500,
        },
      }}>
      <Box
        py={1}
        bottom={0}
        shadow={'9'}
        position={'absolute'}
        flexDirection={'row'}
        bg={'background.50'}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          if (index === 0) {
            return (
              <Box
                key={route.key}
                style={{flex: 1, justifyContent: 'center', height: 60}}>
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{alignItems: 'center'}}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="home"
                    size={'md'}
                    color={isFocused ? 'black' : 'warmGray.400'}
                  />
                  <Text color={isFocused ? 'black' : 'warmGray.400'}>Home</Text>
                </TouchableOpacity>
              </Box>
            );
          }

          if (index === 1) {
            return (
              <Box
                key={route.key}
                style={{flex: 1, justifyContent: 'center', height: 60}}>
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{alignItems: 'center'}}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="plus-circle"
                    size={'md'}
                    color={isFocused ? 'black' : 'warmGray.400'}
                  />
                  <Text color={isFocused ? 'black' : 'warmGray.400'}>
                    Add Patient
                  </Text>
                </TouchableOpacity>
              </Box>
            );
          }

          if (index === 2) {
            return (
              <Box
                key={route.key}
                style={{flex: 1, justifyContent: 'center', height: 60}}>
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{alignItems: 'center'}}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="format-list-bulleted"
                    size={'md'}
                    color={isFocused ? 'black' : 'warmGray.400'}
                  />
                  <Text color={isFocused ? 'black' : 'warmGray.400'}>
                    Patients
                  </Text>
                </TouchableOpacity>
              </Box>
            );
          }

          if (index === 3) {
            return (
              <Box
                key={route.key}
                style={{flex: 1, justifyContent: 'center', height: 60}}>
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{alignItems: 'center'}}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="account"
                    size={'md'}
                    color={isFocused ? 'black' : 'warmGray.400'}
                  />
                  <Text color={isFocused ? 'black' : 'warmGray.400'}>
                    Account
                  </Text>
                </TouchableOpacity>
              </Box>
            );
          }
        })}
      </Box>
    </PresenceTransition>
  );
}

export default BottomTabBar;
