import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu  from './CustomSideBarMenu';
import Login from '../screens/LoginScreen';
import Landing from '../screens/Landing';
import SignUp from '../screens/SignUp';
import FindChild from '../screens/FindChild';
import AddChild from '../screens/AddChild';

export const AppDrawerNavigator = createDrawerNavigator({
    Login:{screen: Login},
    Landing:{screen: Landing},
    SignUp:{screen:SignUp},
    FindChild:{screen:FindChild},
    AddChild:{screen: AddChild}

  },
  
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Landing'
  })
