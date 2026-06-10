import { IBoundaries, ICoordinate } from '../types/types'

export const checkGameOver = (snakeHead: ICoordinate, boundaries: IBoundaries, snake: ICoordinate[]): boolean => {
    if (snakeHead.x < boundaries.xMin || snakeHead.x > boundaries.xMax || snakeHead.y < boundaries.yMin || snakeHead.y > boundaries.yMax) {
        return true
    }
    return snake.slice(1).some((segment) => segment.x === snakeHead.x && segment.y === snakeHead.y)
}
