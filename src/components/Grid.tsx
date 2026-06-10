import { JSX } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../styles/colors'

interface GridProps {
    cols: number
    rows: number
    cellSize: number
}

const Grid = ({ cols, rows, cellSize }: GridProps): JSX.Element => {
    return (
        <View
            style={StyleSheet.absoluteFill}
            pointerEvents="none">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: cols }).map((_, col) => (
                    <View
                        key={`${row}-${col}`}
                        style={{
                            position: 'absolute',
                            left: col * cellSize,
                            top: row * cellSize,
                            width: cellSize,
                            height: cellSize,
                            borderRightWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderColor: Colors.gridLine
                        }}
                    />
                ))
            )}
        </View>
    )
}

export default Grid
