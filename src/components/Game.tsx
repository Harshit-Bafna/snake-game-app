import { StyleSheet, View, LayoutChangeEvent } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { JSX } from 'react/jsx-runtime'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Colors } from '../styles/colors'
import { EDirection, ICoordinate, TGameState } from '../types/types'
import Snake from './Snake'
import { checkGameOver } from '../utils/checkGameOver'
import Food from './Food'
import { checkEatsFoods } from '../utils/checkEatsFoods'
import { generateNewFoodPosition } from '../utils/generateNewFoodPosition'
import Header from './Header'
import Score from './Score'
import Grid from './Grid'
import StartScreen from './StartScreen'
import GameOverScreen from './GameOverScreen'

const CELL = 10
const BASE_INTERVAL = 50
const MIN_INTERVAL = 60
const SCORE_INCREMENT = 10
const HIGH_SCORE_KEY = 'snake_high_score'

const getInterval = (score: number): number => Math.max(MIN_INTERVAL, BASE_INTERVAL - Math.floor(score / 50) * 10)

const Game = (): JSX.Element => {
    const [gameState, setGameState] = useState<TGameState>('start')
    const [direction, setDirection] = useState<EDirection>(EDirection.RIGHT)
    const [food, setFood] = useState<ICoordinate>({ x: 5, y: 20 })
    const [snake, setSnake] = useState<ICoordinate[]>([{ x: 5, y: 5 }])
    const [score, setScore] = useState<number>(0)
    const [highScore, setHighScore] = useState<number>(0)
    const [bounds, setBounds] = useState({ xMin: 0, xMax: 34, yMin: 0, yMax: 74 })
    const [gridSize, setGridSize] = useState({ cols: 35, rows: 75 })

    const snakeRef = useRef(snake)
    const directionRef = useRef(direction)
    const foodRef = useRef(food)
    const scoreRef = useRef(score)
    const boundsRef = useRef(bounds)

    snakeRef.current = snake
    directionRef.current = direction
    foodRef.current = food
    scoreRef.current = score
    boundsRef.current = bounds

    const handleLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout
        const cols = Math.floor(width / CELL)
        const rows = Math.floor(height / CELL)
        setBounds({ xMin: 0, xMax: cols - 1, yMin: 0, yMax: rows - 1 })
        setGridSize({ cols, rows })
    }

    useEffect(() => {
        AsyncStorage.getItem(HIGH_SCORE_KEY).then((val) => {
            if (val) setHighScore(parseInt(val, 10))
        })
    }, [])

    useEffect(() => {
        if (gameState !== 'playing') return

        const intervalId = setInterval(() => {
            moveSnake()
        }, getInterval(scoreRef.current))

        return () => clearInterval(intervalId)
    }, [gameState, snake])

    const moveSnake = () => {
        const currentSnake = snakeRef.current
        const head = currentSnake[0]
        const newHead: ICoordinate = { ...head }

        switch (directionRef.current) {
            case EDirection.UP:
                newHead.y -= 1
                break
            case EDirection.DOWN:
                newHead.y += 1
                break
            case EDirection.LEFT:
                newHead.x -= 1
                break
            case EDirection.RIGHT:
                newHead.x += 1
                break
        }

        if (checkGameOver(newHead, boundsRef.current, currentSnake)) {
            handleGameOver()
            return
        }

        if (checkEatsFoods(newHead, foodRef.current, 2)) {
            const newSnake = [newHead, ...currentSnake]
            const newScore = scoreRef.current + SCORE_INCREMENT
            const newFood = generateNewFoodPosition({ maxX: boundsRef.current.xMax, maxY: boundsRef.current.yMax }, newSnake)
            setSnake(newSnake)
            setFood(newFood)
            setScore(newScore)
        } else {
            setSnake([newHead, ...currentSnake.slice(0, -1)])
        }
    }

    const handleGameOver = async () => {
        const finalScore = scoreRef.current
        setGameState('over')
        if (finalScore > highScore) {
            setHighScore(finalScore)
            await AsyncStorage.setItem(HIGH_SCORE_KEY, String(finalScore))
        }
    }

    const handleGesture = Gesture.Pan().onUpdate((event) => {
        const { translationX, translationY } = event
        const current = directionRef.current

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0 && current !== EDirection.LEFT) setDirection(EDirection.RIGHT)
            else if (translationX < 0 && current !== EDirection.RIGHT) setDirection(EDirection.LEFT)
        } else {
            if (translationY > 0 && current !== EDirection.UP) setDirection(EDirection.DOWN)
            else if (translationY < 0 && current !== EDirection.DOWN) setDirection(EDirection.UP)
        }
    })

    const startGame = () => {
        const b = boundsRef.current
        setSnake([{ x: 5, y: 5 }])
        setFood(generateNewFoodPosition({ maxX: b.xMax, maxY: b.yMax }, [{ x: 5, y: 5 }]))
        setScore(0)
        setDirection(EDirection.RIGHT)
        setGameState('playing')
    }

    const pauseGame = () => {
        if (gameState === 'playing') setGameState('paused')
        else if (gameState === 'paused') setGameState('playing')
    }

    const isPaused = gameState === 'paused'

    return (
        <GestureDetector gesture={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header
                    isPaused={isPaused}
                    pauseGame={pauseGame}
                    reloadGame={startGame}>
                    <Score
                        score={score}
                        highScore={highScore}
                    />
                </Header>
                <View
                    style={styles.boundaries}
                    onLayout={handleLayout}>
                    <Grid
                        cols={gridSize.cols}
                        rows={gridSize.rows}
                        cellSize={CELL}
                    />
                    <Snake snake={snake} />
                    <Food
                        x={food.x}
                        y={food.y}
                    />
                    {gameState === 'start' && (
                        <StartScreen
                            highScore={highScore}
                            onStart={startGame}
                        />
                    )}
                    {gameState === 'over' && (
                        <GameOverScreen
                            score={score}
                            highScore={highScore}
                            onRestart={startGame}
                        />
                    )}
                </View>
            </SafeAreaView>
        </GestureDetector>
    )
}

export default Game

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    boundaries: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background,
        overflow: 'hidden'
    }
})
