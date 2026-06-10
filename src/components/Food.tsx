import { StyleSheet, Text } from 'react-native'
import { JSX } from 'react/jsx-runtime'
import { ICoordinate } from '../types/types'

const CELL = 10

const Food = ({ x, y }: ICoordinate): JSX.Element => {
    return <Text style={[{ left: x * CELL, top: y * CELL }, styles.food]}>🍎</Text>
}

export default Food

const styles = StyleSheet.create({
    food: {
        width: CELL * 2,
        height: CELL * 2,
        position: 'absolute',
        textAlign: 'center',
        lineHeight: CELL * 2,
        fontSize: 16
    }
})
