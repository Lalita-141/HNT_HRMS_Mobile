import React, { useRef, useState } from 'react';
import {
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import OnboardingHeader from '../../components/common/OnboardingHeader';
import OnboardingPagination from '../../components/common/OnboardingPagination';
import { ONBOARDING_DATA, OnboardingSlideItem } from './onboardingData';
import { setHasSeenOnboarding } from '../../services/storage/authStorage';

type OnboardingScreenProps = NativeStackScreenProps<
    AuthStackParamList,
    'Onboarding'
>;

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<OnboardingSlideItem>>(null);

    const handleSkip = () => {
        setHasSeenOnboarding(true);
        navigation.replace('Login');
    };

    const handleNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
            setCurrentIndex(nextIndex);
        } else {
            setHasSeenOnboarding(true);
            navigation.replace('Login');
        }
    };

    const handleMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / windowWidth);
        if (
            newIndex >= 0 &&
            newIndex < ONBOARDING_DATA.length &&
            newIndex !== currentIndex
        ) {
            setCurrentIndex(newIndex);
        }
    };

    const currentSlide = ONBOARDING_DATA[currentIndex] || ONBOARDING_DATA[0];
    const isLastSlide = currentIndex === ONBOARDING_DATA.length - 1;

    // Responsive illustration sizing
    // const illustrationHeight = Math.min(windowHeight * 0.36, 320);

    const renderSlide = ({ item }: { item: OnboardingSlideItem }) => {
        return (
            <View style={[styles.slideContainer, { width: windowWidth }]}>
                <View style={styles.slideContent}>
                    {/* Top Text Header */}
                    <View style={styles.textSection}>
                        {item.hasAccentLine && (
                            <View style={styles.accentLine} />
                        )}

                        <Text style={styles.title}>
                            {item.titlePrefix}
                            <Text style={styles.titleHighlight}>
                                {item.titleHighlight}
                            </Text>
                            {item.titleSuffix}
                        </Text>

                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                    </View>

                    {/* Central 3D Illustration */}
                    <View
                        style={[
                            styles.imageWrapper,
                            { height: windowHeight / 2.2 },
                        ]}>
                        <Image
                            source={item.image}
                            style={styles.illustration}
                            resizeMode="cover"
                        />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Bottom Decorative Curved Background */}
            <Image
                source={require('../../assets/images/PageBottombg.png')}
                style={styles.bottomBgImage}
                resizeMode="stretch"
                pointerEvents="none"
            />

            {/* Top Header with Logo (step 1) and Skip button */}
            <OnboardingHeader
                onSkip={handleSkip}
                showLogo={currentSlide.showLogo}
            />

            {/* Horizontal Onboarding Paging */}
            <FlatList
                ref={flatListRef}
                data={ONBOARDING_DATA}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                getItemLayout={(_, index) => ({
                    length: windowWidth,
                    offset: windowWidth * index,
                    index,
                })}
                style={styles.list}
            />

            {/* Bottom Action Section */}
            <View style={styles.bottomSection}>
                <View style={styles.paginationWrapper}>
                    <OnboardingPagination
                        total={ONBOARDING_DATA.length}
                        currentIndex={currentIndex}
                    />
                </View>

                <View style={styles.buttonWrapper}>
                    <PrimaryButton
                        title={isLastSlide ? 'Get Started' : 'Next'}
                        onPress={handleNext}
                        rightIcon={<Text style={styles.arrow}>→</Text>}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
    },

    bottomBgImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 130,
        zIndex: 0,
    },


    list: {
        flex: 1,
    },

    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: spacing.xxl,
        // borderWidth: 1,
        // borderColor: 'blue'

    },

    slideContent: {
        width: '100%',
        maxWidth: 480,
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: spacing.md,
        // borderWidth: 1,
        // borderColor: "red"
    },

    textSection: {
        alignItems: 'flex-start',
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'black',
        paddingHorizontal: spacing.xxl,
        // marginBottom: spacing.xxl,
    },

    accentLine: {
        width: 76,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.primary,
        marginBottom: spacing.xs,
    },

    title: {
        ...typography.heading,
        color: colors.textPrimary,
        fontSize: 30,
        lineHeight: 34,
        marginTop: spacing.xl,
        marginBottom: spacing.md,
    },

    titleHighlight: {
        color: colors.primary,
        fontWeight: '700',
    },

    description: {
        ...typography.body,
        color: colors.textSecondary,
        fontSize: 16,
        lineHeight: 22,
    },

    imageWrapper: {
        width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginVertical: spacing.md,
        // borderWidth: 1,
        // borderColor: "red"
    },

    illustration: {
        width: '100%',
        height: '100%',
    },

    bottomSection: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: spacing.xxl,
        paddingBottom: spacing.lg,
        zIndex: 10,
    },

    paginationWrapper: {
        marginBottom: spacing.xxl,
        paddingVertical: spacing.lg,
    },

    buttonWrapper: {
        width: '100%',
        maxWidth: 480,
    },

    arrow: {
        color: colors.white,
        fontSize: 20,
        lineHeight: 20,
    },
});

export default OnboardingScreen;
