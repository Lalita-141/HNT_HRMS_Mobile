import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BottomTabBarProps as ReactNavBottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import {
    CalendarIcon,
    ClockIcon,
    DocumentIcon,
    HomeIcon,
    UserIcon,
} from '../icons/SvgIcons';

export type TabKey = 'Home' | 'Attendance' | 'Leaves' | 'Holiday' | 'Profile';

const TAB_ICONS: Record<string, React.FC<{ size?: number; color?: string }>> = {
    Home: HomeIcon,
    Attendance: ClockIcon,
    Leaves: DocumentIcon,
    Holiday: CalendarIcon,
    Profile: UserIcon,
};

/**
 * Standard BottomTabBar for @react-navigation/bottom-tabs
 */
export const NavigationBottomTabBar: React.FC<ReactNavBottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? (options.tabBarLabel as string)
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;
                    const IconComponent = TAB_ICONS[route.name] || HomeIcon;
                    const iconColor = isFocused ? colors.primary : colors.neutral400;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.tabButton}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            activeOpacity={0.7}
                            accessibilityRole="tab"
                            accessibilityState={{ selected: isFocused }}
                            accessibilityLabel={options.tabBarAccessibilityLabel || label}>
                            <View
                                style={[
                                    styles.iconWrapper,
                                    isFocused && styles.activeIconWrapper,
                                ]}>
                                <IconComponent size={22} color={iconColor} />
                            </View>
                            {isFocused && (
                                <Text style={styles.activeLabel}>{label}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

interface StandaloneBottomTabBarProps {
    activeTab?: TabKey;
    onSelectTab?: (tab: TabKey) => void;
}

/**
 * Standalone BottomTabBar fallback for preview/standalone usage
 */
const BottomTabBar: React.FC<StandaloneBottomTabBarProps> = ({
    activeTab = 'Home',
    onSelectTab,
}) => {
    const tabs: { key: TabKey; label: string; Icon: React.FC<{ size?: number; color?: string }> }[] = [
        { key: 'Home', label: 'Home', Icon: HomeIcon },
        { key: 'Attendance', label: 'Attendance', Icon: ClockIcon },
        { key: 'Leaves', label: 'Leaves', Icon: DocumentIcon },
        { key: 'Holiday', label: 'Holiday', Icon: CalendarIcon },
        { key: 'Profile', label: 'Profile', Icon: UserIcon },
    ];

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {tabs.map(tab => {
                    const isActive = activeTab === tab.key;
                    const IconComponent = tab.Icon;
                    const iconColor = isActive ? colors.primary : colors.neutral400;

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={styles.tabButton}
                            onPress={() => onSelectTab?.(tab.key)}
                            activeOpacity={0.7}
                            accessibilityRole="tab"
                            accessibilityState={{ selected: isActive }}
                            accessibilityLabel={tab.label}>
                            <View
                                style={[
                                    styles.iconWrapper,
                                    isActive && styles.activeIconWrapper,
                                ]}>
                                <IconComponent size={22} color={iconColor} />
                            </View>
                            {isActive && (
                                <Text style={styles.activeLabel}>{tab.label}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: spacing.lg,
        paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.md,
        paddingTop: spacing.xs,
        backgroundColor: 'transparent',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
        borderRadius: 28,
        height: 58,
        paddingHorizontal: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderLight,
        // Shadow for iOS
        shadowColor: colors.neutral950,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        // Elevation for Android
        elevation: 6,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    iconWrapper: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },
    activeIconWrapper: {
        backgroundColor: colors.primarySoft,
    },
    activeLabel: {
        fontSize: 9.5,
        fontWeight: '700',
        color: colors.primary,
        marginTop: -2,
    },
});

export default BottomTabBar;
