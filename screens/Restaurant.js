import React, { useEffect, useState } from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import Header from './Header';
import { icons, COLORS, SIZES, FONTS, images } from '../constants';

const Restaurant = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocationRestaurant, setCurrentLocationRestaurant] =
    useState(null);

  useEffect(() => {
    setRestaurant(route.params.item);
    setCurrentLocationRestaurant(route.params.currentLocation);
  }, [route.params.item, route.params.currentLocation]);

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}>
        {restaurant?.menu.map((item, index) => (
          <View key={index} style={styles.foodInfoList}>
            <View style={styles.foodInfoItem}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={styles.foodInfoImage}
              />

              {/* Quantity */}
              <View style={styles.quantity}>
                {/* minus */}
                <TouchableOpacity
                  style={[styles.quantityInner, styles.quantityBtnMinus]}>
                  <Text style={{ ...FONTS.body1 }}>-</Text>
                </TouchableOpacity>
                {/* number */}
                <View style={styles.quantityNumber}>
                  <Text style={{ ...FONTS.h2 }}>5</Text>
                </View>
                {/* plus */}
                <TouchableOpacity
                  style={[styles.quantityInner, styles.quantityBtnPlus]}>
                  <Text style={{ ...FONTS.body1 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Name & Description */}
            <View style={styles.name}>
              <Text style={[styles.nameText, { ...FONTS.h2 }]}>
                {item.name} - {item.price.toFixed(2)}
              </Text>
              <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
            </View>

            {/* Calories */}
            <View style={styles.calories}>
              <Image
                source={icons.fire}
                resizeMode="contain"
                style={styles.caloryImage}
              />
              <Text styles={[{ color: COLORS.darkgray }, { ...FONTS.body3 }]}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots(params) {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        <View style={styles.dotInner}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                opacity={opacity}
                style={[
                  styles.dotAnimated,
                  {
                    width: dotSize,
                  },
                  {
                    height: dotSize,
                  },
                  {
                    backgroundColor: dotColor,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder(params) {
    return (
      <View>
        {renderDots()}
        <View style={styles.orderContainer}>
          <View style={styles.orderInner}>
            <Text style={{ ...FONTS.h3 }}>items in Cart</Text>
            <Text style={{ ...FONTS.h3 }}>$45</Text>
          </View>

          <View style={styles.orderLocation}>
            <View style={styles.orderLocationInner}>
              <Image source={icons.pin} style={styles.orderIcon} />
              <Text style={[{ marginLeft: SIZES.padding }, { ...FONTS.h4 }]}>
                Location
              </Text>
            </View>

            <View style={styles.orderLocationInner}>
              <Image source={icons.master_card} style={styles.orderIcon} />
              <Text style={[{ marginLeft: SIZES.padding }, { ...FONTS.h4 }]}>
                8888
              </Text>
            </View>
          </View>
          {/* Order Button */}
          <View style={styles.orderButton}>
            <TouchableOpacity
              style={styles.orderButtonInner}
              onPress={() =>
                navigation.navigate('OrderDelivery', {
                  restaurant: restaurant,
                  currentLocation: currentLocationRestaurant,
                })
              }>
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
            </TouchableOpacity>
          </View>

          {isIphoneX() && <View style={styles.orderBgInphoneX} />}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onClickIconLeft={() => {
          navigation.goBack();
        }}
        iconLeft={icons.back}
        iconRight={icons.list}
        title={restaurant?.name}
      />
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  foodInfoList: {
    alignItems: 'center',
  },
  foodInfoItem: {
    height: SIZES.height * 0.35,
  },
  foodInfoImage: {
    width: SIZES.width,
    height: '100%',
  },
  quantity: {
    position: 'absolute',
    bottom: -20,
    width: SIZES.width,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  quantityInner: {
    backgroundColor: COLORS.white,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnMinus: {
    borderTopLeftRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
  },
  quantityBtnPlus: {
    borderTopRightRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  quantityNumber: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  name: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding * 2,
    marginTop: 15,
    alignItems: 'center',
  },
  nameText: {
    marginVertical: SIZES.margin,
    alignItems: 'center',
  },
  calories: {
    flexDirection: 'row',
    marginTop: SIZES.margin,
    alignItems: 'center',
  },
  caloryImage: {
    width: 20,
    height: 20,
    marginRight: SIZES.margin,
  },
  dotContainer: {
    height: 30,
  },
  dotInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.padding,
  },
  dotAnimated: {
    borderRadius: SIZES.radius,
    marginHorizontal: 6,
  },
  orderContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius2,
    borderTopRightRadius: SIZES.radius2,
  },
  orderInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
  },
  orderLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  orderLocationInner: {
    flexDirection: 'row',
  },
  orderIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.darkgray,
  },
  orderButton: {
    padding: SIZES.padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButtonInner: {
    backgroundColor: COLORS.primary,
    width: SIZES.width * 0.9,
    padding: SIZES.padding,
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  orderBgInphoneX: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    height: 34,
    backgroundColor: COLORS.white,
  },
});

export default Restaurant;
