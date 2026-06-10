import { Text, StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'
import { JSX } from 'react/jsx-runtime'

interface ScoreProps {
    score: number
    highScore: number
}

export default function Score({ score, highScore }: ScoreProps): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.score}>🍎 {score}</Text>
            <Text style={styles.best}>best: {highScore}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary
    },
    best: {
        fontSize: 11,
        color: Colors.primary,
        opacity: 0.6
    }
})
