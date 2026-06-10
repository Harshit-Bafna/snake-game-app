import { ICoordinate } from '../types/types'

export const generateNewFoodPosition = ({ maxX, maxY }: { maxX: number; maxY: number }): ICoordinate => {
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    }
}
