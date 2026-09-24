import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import LogoSvg from '../../assets/svg/logo-svg.svg';
import SmallLogoSvg from '../../assets/svg/SmallLogo.svg';

interface LogoProps {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}

const SVG_ASPECT_RATIO = 481 / 97;
const SMALL_SVG_ASPECT_RATIO = 49 / 32;

export const Logo: React.FC<LogoProps> = ({
    width = 240,
    height,
    style,
}) => {
    const computedHeight = height ?? Math.round(width / SVG_ASPECT_RATIO);

    return (
        <View style={style}>
            <LogoSvg width={width} height={computedHeight} />
        </View>
    );
};

export const SmallLogo: React.FC<LogoProps> = ({
    width = 44,
    height,
    style,
}) => {
    const computedHeight = height ?? Math.round(width / SMALL_SVG_ASPECT_RATIO);

    return (
        <View style={style}>
            <SmallLogoSvg width={width} height={computedHeight} />
        </View>
    );
};

export default Logo;

