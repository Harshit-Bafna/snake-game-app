import { ICoordinate } from '../types/types'

export const checkEatsFoods = (head: ICoordinate, food: ICoordinate, area: number): boolean => {
    const distanceBetweenFoodAndSnakeX: number = Math.abs(head.x) - Math.abs(food.x)
    const distanceBetweenFoodAndSnakeY: number = Math.abs(head.y) - Math.abs(food.y)

    return distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
}
