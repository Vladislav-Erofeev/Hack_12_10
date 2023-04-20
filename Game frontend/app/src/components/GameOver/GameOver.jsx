import React from 'react'
import classes from './GameOver.module.css'
import { useDispatch } from 'react-redux'
import { setInitial } from '../../redux/slices/gameField'
import { setGameOver } from '../../redux/slices/gameStatus'

const GameOver = ({visibility}) => {
  const dispatch = useDispatch()
  return (
    <div className={visibility ? classes.vis : classes.hid}>
        <h1>! ! ! GAME OVER ! ! !</h1>
        <h4 className={classes.tryagain} onClick={() => {
          dispatch(setInitial())
          dispatch(setGameOver(false))
        }}>TRY AGAIN</h4>
    </div>
  )
}

export default GameOver