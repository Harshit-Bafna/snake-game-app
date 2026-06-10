import { Fragment, JSX } from 'react/jsx-runtime'
import { ICoordinate } from '../types/types'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'

interface ISnakeProps {
    snake: ICoordinate[]
}

const CELL = 10

const getSegmentColor = (index: number, total: number): string => {
    if (index === 0) return Colors.snakeHead
    const t = total <= 1 ? 1 : index / (total - 1)
    const r = Math.round(0x36 + t * (0x84 - 0x36))
    const g = Math.round(0x53 + t * (0xcc - 0x53))
    const b = Math.round(0x14 + t * (0x16 - 0x14))
    return `rgb(${r},${g},${b})`
}

const Snake = ({ snake }: ISnakeProps): JSX.Element => {
    return (
        <Fragment>
            {snake.map((segment: ICoordinate, index: number) => {
                const isHead = index === 0
                const color = getSegmentColor(index, snake.length)
                return (
                    <View
                        key={index}
                        style={[
                            styles.segment,
                            {
                                left: segment.x * CELL,
                                top: segment.y * CELL,
                                backgroundColor: color,
                                width: isHead ? 14 : 12,
                                height: isHead ? 14 : 12,
                                borderRadius: isHead ? 4 : 7,
                                zIndex: isHead ? 2 : 1
                            }
                        ]}
                    />
                )
            })}
        </Fragment>
    )
}

export default Snake

const styles = StyleSheet.create({
    segment: {
        position: 'absolute'
    }
})
