import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { icons, COLORS, SIZES, FONTS } from '../constants';

const Header = ({
  title,
  iconLeft,
  onClickIconLeft,
  iconRight,
  onClickIconRight,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={[styles.headerInner, { paddingLeft: SIZES.padding * 2 }]}
        onPress={onClickIconLeft ? onClickIconLeft : () => {}}>
        <Image
          style={styles.headerImage}
          source={iconLeft}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.headerLocation}>
        <View style={styles.headerLocationLabel}>
          <Text style={{ ...FONTS.h3 }}>{title}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.headerInner, { paddingRight: SIZES.padding * 2 }]}>
        <Image
          style={styles.headerImage}
          source={iconRight}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 50,
  },
  headerInner: {
    width: 50,
    justifyContent: 'center',
  },
  headerImage: {
    width: 30,
    height: 30,
  },
  headerLocation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLocationLabel: {
    width: '70%',
    height: '100%',
    backgroundColor: COLORS.lightGray3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
});

export default Header;
