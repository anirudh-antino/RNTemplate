import React from 'react';
// redux
import {useSelector} from '../redux/store';

// navigation stacks
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

export default function RootNavigation() {
  const {loggedIn} = useSelector(state => state.user);
  
  return <>{loggedIn ? <AppNavigation /> : <AuthNavigation />}</>;
}
