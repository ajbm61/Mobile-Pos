// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore'
const { store } = configureStore();
import ListProduct from './src/ListProduct'

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ListProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;