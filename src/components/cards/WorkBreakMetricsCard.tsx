import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { ClockIcon, CoffeeIcon } from '../icons/SvgIcons';

interface WorkBreakMetricsCardProps {
    workHours?: string;
    breakHours?: string;
}

const WorkBreakMetricsCard: React.FC<WorkBreakMetricsCardProps> = ({
    workHours = '7h 46m',
    breakHours = '45m',
}) => {
    return (
        <View style={styles.container}>
            {/* Work Hours Card */}
            <View style={styles.card}>
                <View style={[styles.iconCircle, styles.workCircle]}>
                    <ClockIcon size={20} color={colors.primary} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.valueText}>{workHours}</Text>
                    <Text style={styles.labelText}>Work Hours</Text>
                </View>
            </View>

            {/* Break Hours Card */}
            <View style={styles.card}>
                <View style={[styles.iconCircle, styles.breakCircle]}>
                    <CoffeeIcon size={20} color={colors.warning} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.valueText}>{breakHours}</Text>
                    <Text style={styles.labelText}>Break Hours</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        gap: spacing.md,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    workCircle: {
        backgroundColor: colors.primarySoft,
    },
    breakCircle: {
        backgroundColor: colors.warningLight,
    },
    textContainer: {
        flex: 1,
    },
    valueText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.neutral950,
    },
    labelText: {
        fontSize: 11,
        fontWeight: '500',
        color: colors.neutral600,
        marginTop: 2,
    },
});

export default WorkBreakMetricsCard;
