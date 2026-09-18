import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface OnboardingPaginationProps {
    total: number;
    currentIndex: number;
}

const OnboardingPagination = ({
    total,
    currentIndex,
}: OnboardingPaginationProps) => {
    return (
        <View
            style={styles.container}
            accessibilityRole="adjustable"
            accessibilityLabel={`Page ${currentIndex + 1} of ${total}`}>
            {Array.from({ length: total }).map((_, index) => {
                const isActive = index === currentIndex;
                return (
                    <View
                        key={`pagination-dot-${index}`}
                        style={[
                            styles.dot,
                            isActive ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

    activeDot: {
        backgroundColor: colors.primary,
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    inactiveDot: {
        backgroundColor: '#CDE5DA',
    },
});

export default OnboardingPagination;
