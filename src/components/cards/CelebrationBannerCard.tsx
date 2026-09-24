import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import {
    ArrowRightIcon,
    BirthdayCakeIcon,
    HeartFillIcon,
    PartyPopperIcon,
} from '../icons/SvgIcons';

interface CelebrationBannerCardProps {
    title?: string;
    subtitle?: string;
    onViewAllPress?: () => void;
    onLikePress?: () => void;
}

const CelebrationBannerCard: React.FC<CelebrationBannerCardProps> = ({
    title = 'Happy Birthday!',
    subtitle = "It's your special day!",
    onViewAllPress,
    onLikePress,
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleHeartPress = () => {
        setIsLiked(prev => !prev);
        // Delightful micro-interaction spring bounce
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.25,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        onLikePress?.();
    };

    return (
        <View style={styles.container}>
            {/* Section Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>People Moments</Text>
                <TouchableOpacity
                    onPress={onViewAllPress}
                    activeOpacity={0.7}
                    style={styles.viewAllBtn}
                    accessibilityRole="button"
                    accessibilityLabel="View all people moments">
                    <Text style={styles.viewAllText}>View All</Text>
                    <ArrowRightIcon size={14} color="#2A9246" />
                </TouchableOpacity>
            </View>

            {/* Banner Card */}
            <View style={styles.banner}>
                {/* Left: White Cake Squircle */}
                <View style={styles.iconBox}>
                    <BirthdayCakeIcon size={28} color="#E11D48" />
                </View>

                {/* Middle: Text Content */}
                <View style={styles.textWrap}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.subtitleText}>{subtitle}</Text>
                </View>

                {/* Right: Party Popper & Heart Button */}
                <View style={styles.actionWrap}>
                    <View style={styles.popperWrap}>
                        <PartyPopperIcon size={24} />
                    </View>

                    <TouchableOpacity
                        onPress={handleHeartPress}
                        activeOpacity={0.85}
                        accessibilityLabel="Wish Happy Birthday"
                        accessibilityRole="button">
                        <Animated.View
                            style={[
                                styles.heartButton,
                                { transform: [{ scale: scaleAnim }] },
                            ]}>
                            <HeartFillIcon
                                size={19}
                                color={isLiked ? '#E11D48' : '#FF2D55'}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral950,
        letterSpacing: -0.2,
    },
    viewAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    viewAllText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2A9246',
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEBF0',
        borderRadius: 22,
        paddingHorizontal: spacing.md,
        paddingVertical: 14,
        shadowColor: '#E11D48',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 1,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 1.5,
    },
    textWrap: {
        flex: 1,
        marginLeft: 14,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E11D48',
        lineHeight: 20,
        letterSpacing: -0.2,
    },
    subtitleText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#475569',
        marginTop: 3,
    },
    actionWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: spacing.sm,
    },
    popperWrap: {
        marginRight: 10,
    },
    heartButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
});

export default React.memo(CelebrationBannerCard);

