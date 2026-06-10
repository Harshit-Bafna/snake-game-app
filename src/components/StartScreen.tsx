import { JSX } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../styles/colors'

interface StartScreenProps {
    highScore: number
    onStart: () => void
}

export default function StartScreen({ highScore, onStart }: StartScreenProps): JSX.Element {
    return (
        <View style={styles.overlay}>
            <Text style={styles.emoji}>🐍</Text>
            <Text style={styles.title}>SNAKE</Text>
            {highScore > 0 && <Text style={styles.best}>Best: {highScore}</Text>}
            <TouchableOpacity
                style={styles.button}
                onPress={onStart}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: Colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    emoji: { fontSize: 56, marginBottom: 8 },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: Colors.secondary,
        letterSpacing: 8
    },
    best: {
        fontSize: 16,
        color: Colors.tertiary,
        marginTop: 8,
        fontWeight: '600'
    },
    button: {
        marginTop: 32,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 48,
        paddingVertical: 14,
        borderRadius: 30
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.primary,
        letterSpacing: 2
    }
})
