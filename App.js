// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore'
import Inventory from './src/Inventory'
import Sale from './src/Sale'
import Report from './src/Report'
import MenuTop from './src/component/MenuTop'
import SearchBluetooth from './src/SearchBluetooth'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const { store } = configureStore();

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>RAMEN BEWOK</Text>
    </View>
  )
}

function Kasir() {
  return (
    <>
      <Tab.Navigator tabBarOptions={{
        style: {
          elevation: 0,
          backgroundColor: '#F6E7D2'
        },
      }}>
        <Tab.Screen name="Inventory" component={Inventory} />
        <Tab.Screen name="Sale" component={Sale} />
        <Tab.Screen name="Report" component={Report} />
      </Tab.Navigator>
    </>    
  )
}

export default function App(props) {

    return (
      <Provider store={store}>        
        <NavigationContainer>
            {/* <MenuTop /> */}
          <Stack.Navigator
            // headerMode="none"
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: "horizontal",
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}            
          >
            <Stack.Screen 
              name="Home" 
              options={{
                headerTitle: () => <LogoTitle />,
                headerRight: () => {
                  return <MenuTop />
                }
              }}
              component={Kasir} />
            <Stack.Screen 
              options={{
                title: 'Search Bluetooth'
              }}
              name="SearchBluetooth" 
              component={SearchBluetooth} />
          </Stack.Navigator>          
        </NavigationContainer>
      </Provider>        
    );
}