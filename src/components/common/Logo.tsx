import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import LogoSvg from '../../assets/logo-svg.svg';

interface LogoProps {
    width?: number;
    height?: number;
    style?: StyleProp<ViewStyle>;
}

const SVG_ASPECT_RATIO = 481 / 97;

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

export default Logo;
