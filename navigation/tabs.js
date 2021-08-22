import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { Home } from '../screens';

import { COLORS, icons } from '../constants';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={styles.tabBarCustomContainer}>
        <View style={styles.tabBarCustomInner}>
          <View style={styles.tabBarCustomItem} />
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={styles.tabBarCustomItem} />
        </View>

        <TouchableOpacity
          style={styles.tabBarCustomButtonSelected}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.tabBarCustomButton}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View style={styles.customTabBar} />
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          { position: 'absolute' },
          { left: 0 },
          { bottom: 0 },
          { right: 0 },
          { borderTopWidth: 0 },
          { backgroundColor: 'transparent' },
          { elevation: 0 },
        ],
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.cutlery}
              resizeMode="contain"
              style={[
                styles.image,
                focused
                  ? { tintColor: COLORS.primary }
                  : { tintColor: COLORS.secondary },
              ]}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={[
                styles.image,
                focused
                  ? { tintColor: COLORS.primary }
                  : { tintColor: COLORS.secondary },
              ]}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.like}
              resizeMode="contain"
              style={[
                styles.image,
                focused
                  ? { tintColor: COLORS.primary }
                  : { tintColor: COLORS.secondary },
              ]}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={[
                styles.image,
                focused
                  ? { tintColor: COLORS.primary }
                  : { tintColor: COLORS.secondary },
              ]}
            />
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: COLORS.white,
  },
  image: {
    width: 24,
    height: 24,
  },
  tabBarCustomButton: {
    flex: 1,
    height: 60,
    backgroundColor: COLORS.white,
  },
  tabBarCustomButtonSelected: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  tabBarCustomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tabBarCustomInner: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  tabBarCustomItem: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Tabs;
