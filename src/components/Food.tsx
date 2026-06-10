import { StyleSheet, Text } from 'react-native'
import { JSX } from 'react/jsx-runtime'
import { ICoordinate } from '../types/types'

const Food = ({ x, y }: ICoordinate): JSX.Element => {
    return <Text style={[{ left: x * 10, top: y * 10 }, styles.food]}>🍎</Text>
}

export default Food

const styles = StyleSheet.create({
    food: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute'
    }
})
