import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppScreen from '../../components/common/AppScreen';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

import Logo from '../../components/common/Logo';
import { getHasSeenOnboarding } from '../../services/storage/authStorage';

type SplashScreenProps = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenOnboarding = getHasSeenOnboarding();
            if (hasSeenOnboarding) {
                navigation.replace('Login');
            } else {
                navigation.replace('Onboarding');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    /*
     * Responsive background sizes
     *
     * We don't use the reference screenshot's
     * fixed 273 x 560 dimensions.
     */
    const topHeight =
        height < 700
            ? height * 0.38
            : height < 850
                ? height * 0.40
                : height * 0.42;

    const bottomHeight =
        height < 700
            ? height * 0.17
            : height < 850
                ? height * 0.20
                : height * 0.22;

    /*
     * Responsive logo size
     */
    const logoWidth =
        width < 360
            ? width * 0.68
            : width < 600
                ? width * 0.65
                : 300;

    return (
        <AppScreen withBackground={false}>
            <View style={styles.container}>

                {/* =========================================
                    TOP DECORATIVE BACKGROUND
                ========================================= */}

                <Image
                    source={require('../../assets/images/PageTopbg.png')}
                    style={[
                        styles.topBackground,
                        {
                            width: width,
                            height: "30%",
                        },
                    ]}
                    resizeMode="stretch"
                    pointerEvents="none"
                />

                {/* =========================================
                    BOTTOM DECORATIVE BACKGROUND
                ========================================= */}

                <Image
                    source={require('../../assets/images/SplashBottombg.png')}
                    style={[
                        styles.bottomBackground,
                        {
                            width: "65%",
                            height: bottomHeight,
                        },
                    ]}
                    resizeMode="stretch"
                    pointerEvents="none"
                />

                {/* =========================================
                    CENTER CONTENT
                ========================================= */}

                <View style={styles.content}>

                    {/* Logo */}
                    <Logo width={logoWidth} style={styles.logo} />

                    {/* Tagline */}
                    <Text style={styles.tagline}>
                        A better
                    </Text>

                    <Text style={styles.tagline}>
                        workplace together
                    </Text>

                </View>

            </View>
        </AppScreen>
    );
};

const styles = StyleSheet.create({
    /* =========================================
       SCREEN
    ========================================= */

    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        position: 'relative',
        overflow: 'hidden',
    },

    /* =========================================
       TOP BACKGROUND
    ========================================= */

    topBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,

    },

    /* =========================================
       BOTTOM BACKGROUND
    ========================================= */

    bottomBackground: {

        // borderColor: 'red',
        // borderWidth: 1,

        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 0,
        width: "80%"
    },

    /* =========================================
       CENTER CONTENT
    ========================================= */

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'blue',
        marginTop: -20,

        /*
         * Slightly move content downward
         * to match the reference design.
         */
        // paddingTop: '8%',

        /*
         * Content must remain above
         * decorative backgrounds.
         */
        zIndex: 1,
    },

    /* =========================================
       LOGO
    ========================================= */

    logo: {
        height: 85,
        // marginBottom: spacing.lg,
    },

    /* =========================================
       TAGLINE
    ========================================= */

    tagline: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default SplashScreen;