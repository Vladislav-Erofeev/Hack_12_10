import React from 'react'
import classes from './GameOver.module.css'
import { useDispatch } from 'react-redux'
import { setInitialField } from '../../../redux/slices/gameField'
import { setGameOver } from '../../../redux/slices/gameStatus'
import { setInitialTools } from '../../../redux/slices/tools'
import { setScore } from '../../../redux/slices/score'

const GameOver = ({visibility}) => {
  const dispatch = useDispatch()
  return (
    <div className={visibility ? classes.vis : classes.hid}>
        <h1>! ! ! GAME OVER ! ! !</h1>
        <h4 className={classes.tryagain} onClick={() => {
          dispatch(setInitialField())
          dispatch(setGameOver(false))
          dispatch(setInitialTools())
          dispatch(setScore({time: 0}))
        }}>TRY AGAIN</h4>
    </div>
  )
}

export default GameOver