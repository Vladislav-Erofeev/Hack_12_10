import React from 'react'
import GameScore from '../GameScore/GameScore'
import Button from '../Button/Button'
import classes from './GameHeader.module.css'
import { useDispatch } from 'react-redux'
import { setInitial } from '../../../redux/slices/gameField'
import { setGameOver } from '../../../redux/slices/gameStatus'

const GameHeader = ({actions}) => {

  const stop = actions

  const dispatch = useDispatch()

  return (
    <div className={classes.header}>
        <GameScore score={999} highScore={9999}/>
        <div>
          <Button title="ЗАНОВО" styles={"pixel"} color={"green"} action={() => {
            dispatch(setInitial())
            dispatch(setGameOver(false))
          }}/>
          <Button title="В МЕНЮ" styles={"pixel"} color={"darkred"} action={() => {
            dispatch(setInitial())
            stop()
          }}/>
        </div>
    </div>
  )
}

export default GameHeader