import React, { useEffect, useState } from 'react'
import classes from './GameScore.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectGameStatus } from '../../../redux/slices/gameStatus'
import { selectScore, setScore } from '../../../redux/slices/score'
import GameOver from '../../components/GameOver/GameOver'

const GameScore = () => {
  const {score, time} = useSelector(selectScore)
  const gameOver = useSelector(selectGameStatus)
  const dispatch = useDispatch()
  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameOver) dispatch(setScore({time: time+1}))
    }, 1000)
    return () => clearInterval(timer)
  }, [time])
  // 60 120 300
  return (
    <div className={classes.score}>
        <h5>Score: {score}</h5>
        <h5>Time: {time}</h5>
    </div>
  )
}

export default GameScore