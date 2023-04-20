import React from 'react'
import classes from './GameScore.module.css'

const GameScore = ({score, highScore}) => {
  return (
    <div className={classes.score}>
        <h3>HighScore: {highScore}</h3>
        <h3>Score: {score}</h3>
    </div>
  )
}

export default GameScore