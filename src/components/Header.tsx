import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { JSX } from 'react'
import { Colors } from '../styles/colors'

interface HeaderProps {
    reloadGame: () => void
    pauseGame: () => void
    children: JSX.Element
    isPaused: boolean
}

export default function Header({ children, reloadGame, pauseGame, isPaused }: HeaderProps): JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={reloadGame}
                hitSlop={8}>
                <Ionicons
                    name="reload-circle"
                    size={35}
                    color={Colors.primary}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={pauseGame}
                hitSlop={8}>
                <FontAwesome
                    name={isPaused ? 'play-circle' : 'pause-circle'}
                    size={35}
                    color={Colors.primary}
                />
            </TouchableOpacity>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: Colors.background
    }
})
