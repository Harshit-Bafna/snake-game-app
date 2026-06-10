import { IBoundaries, ICoordinate } from '../types/types'

export const checkGameOver = (snakeHead: ICoordinate, boundaries: IBoundaries): boolean => {
    return snakeHead.x < boundaries.xMin || snakeHead.x > boundaries.xMax || snakeHead.y < boundaries.yMin || snakeHead.y > boundaries.yMax
}
