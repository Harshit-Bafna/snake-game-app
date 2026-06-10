import { JSX } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../styles/colors'

interface GameOverScreenProps {
    score: number
    highScore: number
    onRestart: () => void
}

export default function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps): JSX.Element {
    const isNewBest = score > 0 && score >= highScore
    return (
        <View style={styles.overlay}>
            <Text style={styles.title}>Game Over</Text>
            <Text style={styles.score}>{score}</Text>
            {isNewBest && <Text style={styles.newBest}>🏆 New best!</Text>}
            {!isNewBest && <Text style={styles.best}>Best: {highScore}</Text>}
            <TouchableOpacity
                style={styles.button}
                onPress={onRestart}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Try Again</Text>
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
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 2,
        marginBottom: 8
    },
    score: {
        fontSize: 64,
        fontWeight: '900',
        color: Colors.secondary
    },
    newBest: {
        fontSize: 16,
        color: Colors.tertiary,
        fontWeight: '700',
        marginTop: 4
    },
    best: {
        fontSize: 15,
        color: Colors.secondary,
        opacity: 0.7,
        marginTop: 4
    },
    button: {
        marginTop: 28,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 44,
        paddingVertical: 13,
        borderRadius: 30
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.primary,
        letterSpacing: 1
    }
})
