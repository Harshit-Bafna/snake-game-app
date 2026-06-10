import { ICoordinate } from '../types/types'

export const generateNewFoodPosition = ({ maxX, maxY }: { maxX: number; maxY: number }, snake: ICoordinate[]): ICoordinate => {
    let pos: ICoordinate
    do {
        pos = {
            x: Math.floor(Math.random() * (maxX - 1)),
            y: Math.floor(Math.random() * (maxY - 1))
        }
    } while (snake.some((s) => s.x === pos.x && s.y === pos.y))
    return pos
}
