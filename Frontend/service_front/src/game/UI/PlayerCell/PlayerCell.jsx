import React, { useEffect, useState } from 'react'
import classes from './PlayerCell.module.css'
import { useSelector } from 'react-redux'
import { selectField } from '../../../redux/slices/gameField'
import { setGameOver } from '../../../redux/slices/gameStatus'

const PlayerCell = ({coords, rotation, size}) => {
  
  // 1 - влево
  // 2 - вниз
  // 3 - вправо
  // 4 - вверх
  const [dir, setDir] = useState(2)

  const [angle, setAngle] = useState(180)
  useEffect(() => {
    if (dir === 1) {
      if (rotation === 2) setAngle(angle - 90)
      else if (rotation === 4) setAngle(angle + 90)
      else if (rotation === 3) setAngle(angle - 180)
    }
    else if (dir === 2) {
      if (rotation === 1) setAngle(angle + 90)
      else if (rotation === 3) setAngle(angle - 90)     
      else if (rotation === 4) setAngle(angle - 180)  
    }
    else if (dir === 3) {
      if (rotation === 2) setAngle(angle + 90)
      else if (rotation === 4) setAngle(angle - 90)   
      else if (rotation === 1) setAngle(angle - 180)    
    }
    else if (dir === 4) {
      if (rotation === 1) setAngle(angle - 90)
      else if (rotation === 3) setAngle(angle + 90)    
      else if (rotation === 2) setAngle(angle - 180)   
    }
    setDir(rotation)
  }, [rotation])
  return (
    <div className={classes.player}
      style={{width: size, height: size,
        left: coords.x * size, top: coords.y * size,
        transform: `rotate(${angle}deg)`}}
    ></div>
  )
}

export default PlayerCell