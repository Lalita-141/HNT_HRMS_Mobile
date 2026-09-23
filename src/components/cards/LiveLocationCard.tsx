import React from 'react';
import {
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { LocationPinIcon } from '../icons/SvgIcons';
import Svg, { Circle } from 'react-native-svg';

interface LiveLocationCardProps {
    isTrackingOn?: boolean;
    onToggleTracking?: (val: boolean) => void;
    lastUpdatedTime?: string;
    locationName?: string;
    isWithinAllowedArea?: boolean;
    onViewOnMap?: () => void;
}

const LiveLocationCard: React.FC<LiveLocationCardProps> = ({
    isTrackingOn = true,
    onToggleTracking,
    lastUpdatedTime = '09:24 AM',
    locationName = 'DLF Cyber City, Gurugram',
    isWithinAllowedArea = true,
    onViewOnMap,
}) => {
    return (
        <View style={styles.card}>
            {/* Header: Title + Tracking Switch */}
            <View style={styles.headerRow}>
                <View style={styles.titleRow}>
                    <LocationPinIcon size={20} color={colors.info} />
                    <Text style={styles.titleText}>Live Location Tracking</Text>
                </View>

                <View style={styles.switchWrapper}>
                    <Text style={styles.switchStatus}>
                        {isTrackingOn ? 'Within Allowed Area' : 'Tracking OFF'}
                    </Text>
                    <Switch
                        value={isTrackingOn}
                        onValueChange={onToggleTracking}
                        trackColor={{ false: colors.neutral300, true: colors.primary }}
                        thumbColor={colors.white}
                        style={styles.switch}
                    />
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Body: Location Info + Radar Mini Visual */}
            <View style={styles.bodyRow}>
                {/* Left Info Column */}
                <View style={styles.infoCol}>
                    <Text style={styles.labelMuted}>Last updated</Text>
                    <Text style={styles.timeValue}>{lastUpdatedTime}</Text>
                    <Text style={styles.locationValue} numberOfLines={1}>
                        {locationName}
                    </Text>

                    <TouchableOpacity
                        onPress={onViewOnMap}
                        activeOpacity={0.7}
                        style={styles.viewMapButton}>
                        <Text style={styles.viewMapText}>View on Map →</Text>
                    </TouchableOpacity>
                </View>

                {/* Right Radar / Geofence Visual Graphic */}
                <View style={styles.radarWrapper}>
                    <View style={styles.radarContainer}>
                        <Svg width={80} height={80} viewBox="0 0 80 80">
                            {/* Outer Radar Circle */}
                            <Circle
                                cx="40"
                                cy="40"
                                r="36"
                                fill="#DCFCE7"
                                fillOpacity="0.5"
                                stroke="#86EFAC"
                                strokeWidth="1"
                                strokeDasharray="3 3"
                            />
                            {/* Middle Circle */}
                            <Circle
                                cx="40"
                                cy="40"
                                r="24"
                                fill="#86EFAC"
                                fillOpacity="0.4"
                            />
                            {/* User Pin Dot */}
                            <Circle cx="40" cy="40" r="5" fill="#1D68ED" />
                        </Svg>
                    </View>

                    <View style={styles.allowedPill}>
                        <View style={styles.greenDot} />
                        <Text style={styles.allowedPillText}>Within Office Area</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: spacing.lg,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.neutral950,
        marginLeft: 6,
    },
    switchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchStatus: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.success,
        marginRight: 6,
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    divider: {
        height: 1,
        backgroundColor: colors.neutral100,
        marginVertical: spacing.sm,
    },
    bodyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoCol: {
        flex: 1,
        paddingRight: spacing.sm,
    },
    labelMuted: {
        fontSize: 10,
        color: colors.neutral600,
    },
    timeValue: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral950,
        marginVertical: 1,
    },
    locationValue: {
        fontSize: 11,
        color: colors.neutral800,
        marginBottom: 6,
    },
    viewMapButton: {
        alignSelf: 'flex-start',
    },
    viewMapText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.info,
    },
    radarWrapper: {
        alignItems: 'center',
    },
    radarContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    allowedPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primarySoft,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        marginTop: 2,
    },
    greenDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: colors.success,
        marginRight: 4,
    },
    allowedPillText: {
        fontSize: 9,
        fontWeight: '600',
        color: colors.primaryDark,
    },
});

export default LiveLocationCard;
