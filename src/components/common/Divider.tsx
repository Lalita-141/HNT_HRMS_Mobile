import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface DividerProps {
    text?: string;
}

const Divider = ({ text = 'Or' }: DividerProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />

            <Text style={styles.text}>{text}</Text>

            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xxxl,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },

    text: {
        marginHorizontal: spacing.md,
        color: colors.textSecondary,
        fontSize: 16,
    },
});

export default Divider;