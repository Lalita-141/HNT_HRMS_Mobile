import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface CelebrationBannerCardProps {
    title?: string;
    subtitle?: string;
    onViewAllPress?: () => void;
}

const CelebrationBannerCard: React.FC<CelebrationBannerCardProps> = ({
    title = 'Happy Birthday!',
    subtitle = "It's your special day!",
    onViewAllPress,
}) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>People Moments</Text>
                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={styles.viewAllText}>View All →</Text>
                </TouchableOpacity>
            </View>

            {/* Banner */}
            <View style={styles.banner}>
                {/* Cake Icon Circle */}
                <View style={styles.iconCircle}>
                    <Text style={styles.cakeEmoji}>🎂</Text>
                </View>

                {/* Text Content */}
                <View style={styles.textWrap}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.subtitleText}>{subtitle}</Text>
                </View>

                {/* Celebration Decorations */}
                <View style={styles.decorations}>
                    <Text style={styles.popperEmoji}>🎉</Text>
                    <Text style={styles.heartEmoji}>❤️</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
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
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primary,
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF1F2',
        borderRadius: 20,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: '#FFE4E6',
        shadowColor: '#E11D48',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: '#FECDD3',
    },
    cakeEmoji: {
        fontSize: 22,
    },
    textWrap: {
        flex: 1,
    },
    titleText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#E11D48',
    },
    subtitleText: {
        fontSize: 11,
        fontWeight: '500',
        color: colors.neutral800,
        marginTop: 2,
    },
    decorations: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    popperEmoji: {
        fontSize: 18,
    },
    heartEmoji: {
        fontSize: 16,
    },
});

export default CelebrationBannerCard;
