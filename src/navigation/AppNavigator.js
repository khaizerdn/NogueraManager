import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FinanceScreen from '../screens/FinanceScreen';
import TodoScreen from '../screens/TodoScreen';
import NotesScreen from '../screens/NotesScreen';
import { COLORS } from '../config/GlobalStyles';
import { HomeIcon, FinanceIcon, TodoIcon, NotesIcon } from '../config/CustomIcons';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        // Outer container spans full width and centers inner container.
        backgroundColor: COLORS.bgLayer0,
        alignItems: 'center',
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-around',
          height: 60, // desired height of the tab bar
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={1} // No fading effect on press
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? COLORS.navActive : COLORS.navInactive,
                size: 24,
              })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        // Define the icon for each route:
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') return <HomeIcon isActive={focused} />;
          if (route.name === 'Finance') return <FinanceIcon isActive={focused} />;
          if (route.name === 'To-Do') return <TodoIcon isActive={focused} />;
          if (route.name === 'Notes') return <NotesIcon isActive={focused} />;
          return null;
        },
      })}
      // Use our custom tab bar component instead of the default one
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Finance" component={FinanceScreen} />
      <Tab.Screen name="To-Do" component={TodoScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
    </Tab.Navigator>
  );
}
