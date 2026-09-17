import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screenWidth = width;
export const screenHeight = height;

export const isSmallDevice = width < 360;
export const isTablet = width >= 768;