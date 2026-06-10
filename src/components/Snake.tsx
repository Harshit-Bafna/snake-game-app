import { Fragment, JSX } from 'react/jsx-runtime'
import { ICoordinate } from '../types/types'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'

interface ISnakeProps {
    snake: ICoordinate[]
}

const Snake = ({ snake }: ISnakeProps): JSX.Element => {
    return (
        <Fragment>
            {snake.map((segment: ICoordinate, index: number) => {
                const segmentStyle = {
                    left: segment.x * 10,
                    top: segment.y * 10
                }
                return (
                    <View
                        key={index}
                        style={[styles.snake, segmentStyle]}
                    />
                )
            })}
        </Fragment>
    )
}

export default Snake

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 7,
        backgroundColor: Colors.primary,
        position: 'absolute'
    }
})
