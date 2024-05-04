import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Page1Screen from './screens/Page1Screen';
import Page2Screen from './screens/Page2Screen';
import DailyDiscussion from './screens/DailyDiscussion';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Ecosystem Website" component={Page1Screen} />
        <Stack.Screen name="Infinite Campus" component={Page2Screen} />
        <Stack.Screen name="DailyDiscussion" component={DailyDiscussion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
