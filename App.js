// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore'
const { store } = configureStore();
import Inventory from './src/Inventory'
import Sale from './src/Sale'
import Report from './src/Report'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <View style={{paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>RAMEN BEWOK</Text>
            <TouchableOpacity>
              <Ionicons name="menu-outline" size={30} color="#000" />
            </TouchableOpacity>
          </View>   
          <Tab.Navigator tabBarOptions={{
            style: {
              elevation: 0
            },            
          }}>
              <Tab.Screen name="Inventory" component={Inventory} />
              <Tab.Screen name="Sale" component={Sale} />
              <Tab.Screen name="Report" component={Report} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>        
    );
}