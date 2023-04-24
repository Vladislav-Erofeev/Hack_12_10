import React, { useEffect, useRef, useState } from 'react'
import FieldCell from '../../UI/FieldCell/FieldCell'
import classes from './GamePlay.module.css'
import PlayerCell from '../../UI/PlayerCell/PlayerCell'
import { useDispatch, useSelector } from 'react-redux'
import {selectBackgroundField, selectCops, selectField, setCopsMoves, setField} from '../../../redux/slices/gameField'
import GameOver from '../GameOver/GameOver'
import { selectGameStatus, setGameOver } from '../../../redux/slices/gameStatus'
import EnemyCell from '../../UI/EnemyCell/EnemyCell'
import { fetchField } from '../../../redux/slices/gameField'

const GamePlay = () => {

  const fieldRef = useRef(null)

  const [cellSize, setCellSize] = useState(20)

  const gameOver = useSelector(selectGameStatus)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchField())
  }, [gameOver])

  const {field, coords} = useSelector(selectField)

  const [dir, setDir] = useState(2)

  const collideble = {2: true, 3: true, 4: true, 5:true, 6: true, 7: true}

  var [moveAllowed,setMoveAllowed] = useState(true)

  // можно было бы использовать useKeyBoardBindings,
  // но уже впадлу переделывать
  const handleKeyEvent = (event) => {
    const prevCoords = {x: coords.x, y: coords.y}
    var newCoords
    // && dir !== 3
    if (event.key === 'ArrowLeft' && prevCoords.x > 0 &&
        !(field[prevCoords.y][prevCoords.x-1] in collideble)) {
      newCoords = {...prevCoords, x: prevCoords.x - 1}
      setDir(1)
    }
    // && dir !== 1
    if (event.key === 'ArrowRight' && prevCoords.x < 29 &&
        !(field[prevCoords.y][prevCoords.x+1] in collideble)) {
      newCoords = {...prevCoords, x: prevCoords.x + 1}
      setDir(3)
    }
    // && dir !== 2
    if (event.key === 'ArrowUp' && prevCoords.y > 0 &&
        !(field[prevCoords.y-1][prevCoords.x] in collideble)) {
      newCoords = {...prevCoords, y: prevCoords.y - 1}
      setDir(4)
    }
    // && dir !== 4
    if (event.key === 'ArrowDown' && prevCoords.y < 29 &&
        !(field[prevCoords.y+1][prevCoords.x] in collideble)) {
      newCoords = {...prevCoords, y: prevCoords.y + 1}
      setDir(2)
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
      setMoveAllowed(false)
      setTimeout(() => setMoveAllowed(true), 300)
      dispatch(setField({
        field: new_field,
        coords: newCoords
      }))
    }
  }

  useEffect(() => {
    if (fieldRef.current.offsetWidth > fieldRef.current.offsetHeight)
      setCellSize((fieldRef.current.offsetHeight-20)/30)
    else {
      setCellSize((fieldRef.current.offsetWidth-20)/30)
    }
  }, [fieldRef.current, fieldRef.current])

  useEffect(() => {
    if (gameOver) setDir(2)
  }, [gameOver])

  const copMove = (x, y, copDir) => {
      // 1 - влево
      if (copDir === 1) {
        if (x > 0 && !(field[y][x - 1]  in collideble)) return {x: x-1, y: y, copDir: copDir} //Продолжаем
        else if (y > 0 && !(field[y - 1][x] in collideble)) return {x: x, y: y-1, copDir: 4} //Вверх
        else if (y < 29 && !(field[y + 1][x] in collideble)) return {x: x, y: y+1, copDir: 2} //Вниз
        else if (x < 29 && !(field[y][x + 1] in collideble)) return {x: x+1, y: y, copDir: 3} //Разворот
      }
      // 2 - вниз
      else if (copDir === 2) {
        if (y < 29 && !(field[y+1][x] in collideble)) return {x: x, y: y+1, copDir: copDir} //Продолжаем
        else if (x > 0 && !(field[y][x-1] in collideble)) return {x: x-1, y: y, copDir: 1} //Влево
        else if (x < 29 && !(field[y][x+1] in collideble)) return {x: x+1, y: y, copDir: 3} //Вправо
        else if (y > 0 && !(field[y-1][x] in collideble)) return {x: x, y: y-1, copDir: 4} //Разворот
      }
      // 3 - вправо
      else if (copDir === 3) {
        if (x < 29 && !(field[y][x + 1] in collideble)) return {x: x+1, y: y, copDir: copDir} //Продолжаем
        else if (y > 0 && !(field[y - 1][x] in collideble)) return {x: x, y: y-1, copDir: 4} //Вверх
        else if (y < 29 && !(field[y + 1][x] in collideble)) return {x: x, y: y+1, copDir: 2} //Вниз
        else if (x > 0 && !(field[y][x - 1] in collideble)) return {x: x-1, y: y, copDir: 1} //Разворот
      }
      // 4 - вверх
      else if (copDir === 4) {
        if (y > 0 && !(field[y-1][x] in collideble)) return {x: x, y: y-1, copDir: copDir} //Продолжаем
        else if (x > 0 && !(field[y][x-1] in collideble)) return {x: x-1, y: y, copDir: 1} //Влево
        else if (x < 29 && !(field[y][x+1] in collideble)) return {x: x+1, y: y, copDir: 3} //Вправо
        else if (y < 29 && !(field[y+1][x] in collideble)) return {x: x, y: y+1, copDir: 2} //Разворот
      }
      else return {x: x, y: y, copDir: copDir}
  }

  const cops = useSelector(selectCops)
  useEffect(() => {
    if (!gameOver) {
    const copsUpdate = setInterval(() => {
      for (let i = 0; i < cops.length; i++) {
        if (coords.x === cops[i].x && cops[i].y === coords.y) {
          dispatch(setGameOver(true))
        }
      }
      const newCopsPos = cops.map((cop) => copMove(cop.x, cop.y, cop.copDir))
      dispatch(setCopsMoves(newCopsPos))
    }, 450)
    return () => clearInterval(copsUpdate)
  }}, [cops])
  
  return (
    <div ref = {fieldRef} className={classes.gamePlay} tabIndex={0}
      onKeyDownCapture={(event) => {
        if (moveAllowed) {
          handleKeyEvent(event)
        }
        else return
    }}>
      <div className={classes.field} style={{position: "relative", backgroundColor:`url(http://194.58.119.86:8080/image${useSelector(selectBackgroundField)})`}}>
        {field.map((row, row_index) =>
          <div className={classes.row} key = {row_index}>{row.map((cell, index) => 
            <FieldCell key = {index} coords={{x: index, y: row_index}} value={cell} size={cellSize}/>
          )}</div>)}
        <PlayerCell coords={coords} rotation={dir} size={cellSize}/>
        <EnemyCell coords={{x: cops[0].x , y: cops[0].y}} rotation={cops[0].copsDir} size={cellSize}/>
        <EnemyCell coords={{x: cops[1].x , y: cops[1].y}} rotation={cops[1].copsDir} size={cellSize}/>
        <EnemyCell coords={{x: cops[2].x , y: cops[2].y}} rotation={cops[2].copsDir} size={cellSize}/>
        <EnemyCell coords={{x: cops[3].x , y: cops[3].y}} rotation={cops[3].copsDir} size={cellSize}/>
      </div>
      <GameOver visibility={gameOver}/>
    </div>
  )
}

export default GamePlay