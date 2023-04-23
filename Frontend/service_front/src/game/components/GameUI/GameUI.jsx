import React, { useState } from 'react'
import Toolbar from '../../UI/Toolbar/Toolbar'
import GameHeader from '../../UI/GameHeader/GameHeader'
import classes from './GameUI.module.css'
import GamePlay from '../GamePlay/GamePlay'
import StartMenu from '../StartMenu/StartMenu'

const GameUI = () => {
  
  const [start, setStart] = useState(null)

  const startGame = () => {
    setStart(true)
  }

  const toMenu = () => {
    setStart(false)
  }
  
  return (
    <div>
      {start
        ? <div className={classes.UI}>
            <Toolbar/>
            <GameHeader actions = {toMenu}/>
            <GamePlay/>
          </div>
        : <StartMenu actions={startGame}/>
      }
    </div>
  )
}

export default GameUI