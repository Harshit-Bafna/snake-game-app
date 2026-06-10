export interface IGestureEventType {
    nativeEvent: { translationX: number; translationY: number }
}

export interface ICoordinate {
    x: number
    y: number
}

export enum EDirection {
    RIGHT = 'right',
    UP = 'up',
    LEFT = 'left',
    DOWN = 'down'
}

export interface IBoundaries {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
}
