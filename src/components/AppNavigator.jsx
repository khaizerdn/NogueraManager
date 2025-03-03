import React, { useState, useCallback } from 'react';
import { View, Pressable, Vibration, ScrollView, RefreshControl } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FinanceScreen from '../screens/FinanceScreen';
import TodoScreen from '../screens/TodoScreen';
import NotesScreen from '../screens/NotesScreen';
import { COLORS } from '../config/GlobalStyles';
import { HomeIcon, FinanceIcon, TodoIcon, NotesIcon } from '../config/CustomIcons';
import PlusButton from '../components/PlusButton';
import globalStyles from '../config/GlobalStyles';

const Tab = createBottomTabNavigator();

// Reusable wrapper component for pull-to-refresh
const ScreenWrapper = ({ children, onRefresh, triggerRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    if (onRefresh) {
      await onRefresh(); // Call screen-specific refresh logic if provided
    } else {
      // Default refresh logic (short 500ms delay for empty screens)
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setRefreshing(false);
  }, [onRefresh]);

  // Allow external trigger to start refresh
  React.useEffect(() => {
    if (triggerRefresh) {
      handleRefresh();
    }
  }, [triggerRefresh, handleRefresh]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.bgLayer0 }} // Background only, no padding
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={COLORS.btnActive} // #FFFFFF for iOS spinner
          colors={[COLORS.btnActive]} // #FFFFFF for Android spinner
          progressBackgroundColor={COLORS.bgLayer0} // #121212 background on Android
        />
      }
    >
      {children}
    </ScrollView>
  );
};

function MyTabBar({ state, navigation, descriptors }) {
  const handlePress = (index, routeName) => {
    const route = state.routes[index];
    const event = navigation.emit({ type: 'tabPress', target: route.key });

    if (state.index === index) {
      Vibration.vibrate(50);
      // Trigger refresh on the active screen
      const descriptor = descriptors[route.key];
      const { options } = descriptor;
      if (options.tabScreenProps && options.tabScreenProps.triggerRefresh) {
        options.tabScreenProps.triggerRefresh();
      }
    } else if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.bgLayer0, height: 80, justifyContent: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
          alignItems: 'center',
        }}
      >
        {/* Home Tab */}
        <Pressable
          onPress={() => handlePress(0, 'Home')}
          style={globalStyles.navButton}
        >
          {({ pressed }) => <HomeIcon isActive={state.index === 0} pressed={pressed} />}
        </Pressable>

        {/* Finance Tab */}
        <Pressable
          onPress={() => handlePress(1, 'Finance')}
          style={globalStyles.navButton}
        >
          {({ pressed }) => <FinanceIcon isActive={state.index === 1} pressed={pressed} />}
        </Pressable>

        {/* Central Plus Button */}
        <Pressable style={globalStyles.navButton}>
          <PlusButton />
        </Pressable>

        {/* To-Do Tab */}
        <Pressable
          onPress={() => handlePress(2, 'To-Do')}
          style={globalStyles.navButton}
        >
          {({ pressed }) => <TodoIcon isActive={state.index === 2} pressed={pressed} />}
        </Pressable>

        {/* Notes Tab */}
        <Pressable
          onPress={() => handlePress(3, 'Notes')}
          style={globalStyles.navButton}
        >
          {({ pressed }) => <NotesIcon isActive={state.index === 3} pressed={pressed} />}
        </Pressable>
      </View>
    </View>
  );
}

export default function AppNavigator() {
  // State to trigger refresh for each screen
  const [refreshTriggers, setRefreshTriggers] = useState({
    Home: 0,
    Finance: 0,
    'To-Do': 0,
    Notes: 0,
  });

  const triggerRefresh = (routeName) => {
    setRefreshTriggers((prev) => ({
      ...prev,
      [routeName]: prev[routeName] + 1, // Increment to trigger useEffect in ScreenWrapper
    }));
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        options={{ tabScreenProps: { triggerRefresh: () => triggerRefresh('Home') } }}
      >
        {() => (
          <ScreenWrapper triggerRefresh={refreshTriggers.Home}>
            <HomeScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Finance"
        options={{ tabScreenProps: { triggerRefresh: () => triggerRefresh('Finance') } }}
      >
        {() => (
          <ScreenWrapper triggerRefresh={refreshTriggers.Finance}>
            <FinanceScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="To-Do"
        options={{ tabScreenProps: { triggerRefresh: () => triggerRefresh('To-Do') } }}
      >
        {() => (
          <ScreenWrapper triggerRefresh={refreshTriggers['To-Do']}>
            <TodoScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        options={{ tabScreenProps: { triggerRefresh: () => triggerRefresh('Notes') } }}
      >
        {() => (
          <ScreenWrapper triggerRefresh={refreshTriggers.Notes}>
            <NotesScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}