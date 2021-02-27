import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import Landing from './screens/Landing';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'



export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  Landing:{screen: Landing},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);

