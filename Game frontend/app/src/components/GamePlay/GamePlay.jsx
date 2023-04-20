import React, { useState } from 'react'
import FieldCell from '../../UI/FieldCell/FieldCell'
import classes from './GamePlay.module.css'
import PlayerCell from '../../UI/PlayerCell/PlayerCell'
import { useDispatch, useSelector } from 'react-redux'
import { selectField, setField } from '../../redux/slices/gameField'
import GameOver from '../GameOver/GameOver'
import { selectGameStatus } from '../../redux/slices/gameStatus'

const GamePlay = () => {

  const gameOver = useSelector(selectGameStatus)

  const dispatch = useDispatch()

  const {field, coords} = useSelector(selectField)

  const [dir, setDir] = useState(0)

  const collideble = {2: true, 3: true, 4: true, 5: true}

  var [moveAllowed,setMoveAllowed] = useState(true)

  const handleKeyEvent = (event) => {
    const prevCoords = {x: coords.x, y: coords.y}
    var newCoords
    if (event.key === 'ArrowLeft' && dir !== 2 && prevCoords.x > 0 &&
        !(field[prevCoords.y][prevCoords.x-1] in collideble)) {
      newCoords = {...prevCoords, x: prevCoords.x - 1}
      setDir(1)
    }
    if (event.key === 'ArrowRight' && dir !== 1 && prevCoords.x < 4 &&
        !(field[prevCoords.y][prevCoords.x+1] in collideble)) {
      newCoords = {...prevCoords, x: prevCoords.x + 1}
      setDir(2)
    }
    if (event.key === 'ArrowUp' && dir !== 4 && prevCoords.y > 0 &&
        !(field[prevCoords.y-1][prevCoords.x] in collideble)) {
      newCoords = {...prevCoords, y: prevCoords.y - 1}
      setDir(3)
    }
    if (event.key === 'ArrowDown' && dir !== 3 && prevCoords.y < 4 &&
        !(field[prevCoords.y+1][prevCoords.x] in collideble)) {
      newCoords = {...prevCoords, y: prevCoords.y + 1}
      setDir(4)
    }
    if (newCoords) {
      let new_field = field.map((row, row_index) =>
        row_index === prevCoords.y
          ? row.map((cell, index) => 
            index === prevCoords.x
              ? 0
              : cell
          )
          : row
      )

      new_field = new_field.map((row, row_index) =>
        row_index === newCoords.y
          ? row.map((cell, index) =>
            index === newCoords.x
              ? 1
              : cell
          )
          : row
      )
      
      dispatch(setField({
        field: new_field,
        coords: newCoords
      }))
    }
  }
  
  return (
    <div className={classes.gamePlay} tabIndex={0}
      onKeyDownCapture={(event) => {
        if (moveAllowed) {
          handleKeyEvent(event)
          setMoveAllowed(false)
          setTimeout(() => setMoveAllowed(true), 300)
        }
        else return
    }}>
      <div style={{position: "relative"}}>
        {field.map((row, row_index) =>
          <div className={classes.row} key = {row_index}>{row.map((cell, index) => 
            <FieldCell key = {index} value={cell}/>
          )}</div>)}
        <PlayerCell coords={coords}/>
      </div>
      <GameOver visibility={gameOver}/>
    </div>
  )
}

export default GamePlay