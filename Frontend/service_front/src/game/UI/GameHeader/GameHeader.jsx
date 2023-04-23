import React from 'react'
import GameScore from '../GameScore/GameScore'
import Button from '../Button/Button'
import classes from './GameHeader.module.css'
import { useDispatch } from 'react-redux'
import { setInitialField } from '../../../redux/slices/gameField'
import { setGameOver } from '../../../redux/slices/gameStatus'
import { setInitialTools } from '../../../redux/slices/tools'
import useSound from 'use-sound'
import { setScore } from '../../../redux/slices/score'

const GameHeader = ({actions}) => {

  const stop = actions

  const dispatch = useDispatch()

  return (
    <div className={classes.header}>
        <GameScore score={999} highScore={9999}/>
        <div>
          <Button title="ЗАНОВО" styles={"pixel"} color={"green"} action={() => {
            dispatch(setInitialField())
            dispatch(setGameOver(false))
            dispatch(setInitialTools())
            dispatch(setScore({time: 0}))
          }}/>
          <Button title="В МЕНЮ" styles={"pixel"} color={"darkred"} action={() => {
            dispatch(setInitialField())
            dispatch(setInitialTools())
            dispatch(setGameOver(false))
            dispatch(setScore({time: 0}))
            stop()
          }}/>
        </div>
    </div>
  )
}

export default GameHeader