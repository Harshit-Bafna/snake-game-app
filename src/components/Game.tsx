import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { JSX } from 'react/jsx-runtime'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'

import { Colors } from '../styles/colors'
import { EDirection, ICoordinate } from '../types/types'
import Snake from './Snake'
import { checkGameOver } from '../utils/checkGameOver'
import Food from './Food'
import { checkEatsFoods } from '../utils/checkEatsFoods'
import { generateNewFoodPosition } from '../utils/generateNewFoodPosition'
import Header from './Header'
import Score from './Score'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }]
const FOOD_INITIAL_POSITION = { x: 5, y: 20 }
const GAME_BOUNDS = { xMin: 0, xMax: 34, yMin: 0, yMax: 74 }
const MOVE_INTERVAL = 50
const SCORE_INCREMENT = 10
const EDIBLE_AREA = 1

const Game = (): JSX.Element => {
    const [direction, setDirection] = useState<EDirection>(EDirection.RIGHT)
    const [food, setFood] = useState<ICoordinate>(FOOD_INITIAL_POSITION)
    const [snake, setSnake] = useState<ICoordinate[]>(SNAKE_INITIAL_POSITION)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        if (!isGameOver) {
            const intervalId = setInterval(() => {
                !isPaused && moveSnake()
            }, MOVE_INTERVAL)

            return () => clearInterval(intervalId)
        }
    }, [snake, isGameOver, isPaused])

    const moveSnake = () => {
        const snakeHead = snake[0]
        const newHead = { ...snakeHead }

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver(true)
            return
        }

        switch (direction) {
            case EDirection.UP:
                newHead.y -= 1
                break
            case EDirection.LEFT:
                newHead.x -= 1
                break
            case EDirection.RIGHT:
                newHead.x += 1
                break
            case EDirection.DOWN:
                newHead.y += 1
                break
            default:
                break
        }

        if (checkEatsFoods(newHead, food, EDIBLE_AREA)) {
            setFood(
                generateNewFoodPosition({
                    maxX: GAME_BOUNDS.xMax,
                    maxY: GAME_BOUNDS.yMax
                })
            )
            setSnake([newHead, ...snake])
            setScore(score + SCORE_INCREMENT)
        } else {
            setSnake([newHead, ...snake.slice(0, -1)])
        }
    }

    const handleGesture = Gesture.Pan().onUpdate((event) => {
        const { translationX, translationY } = event

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(EDirection.RIGHT)
            } else {
                setDirection(EDirection.LEFT)
            }
        } else {
            if (translationY > 0) {
                setDirection(EDirection.DOWN)
            } else {
                setDirection(EDirection.UP)
            }
        }
    })

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION)
        setFood(FOOD_INITIAL_POSITION)
        setIsGameOver(false)
        setScore(0)
        setDirection(EDirection.RIGHT)
        setIsPaused(false)
    }

    const pauseGame = () => {
        setIsPaused(!isPaused)
    }

    return (
        <GestureDetector gesture={handleGesture}>
            <SafeAreaView style={styles.conatiner}>
                <Header
                    isPaused={isPaused}
                    pauseGame={pauseGame}
                    reloadGame={reloadGame}>
                    <Score score={score} />
                </Header>
                <View style={styles.boundaries}>
                    <Snake snake={snake} />
                    <Food
                        x={food.x}
                        y={food.y}
                    />
                </View>
            </SafeAreaView>
        </GestureDetector>
    )
}

export default Game

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        height: 10,
        backgroundColor: Colors.primary
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background
    }
})
