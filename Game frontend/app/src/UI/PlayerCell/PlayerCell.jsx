import React from 'react'
import classes from './PlayerCell.module.css'

const PlayerCell = ({coords}) => {
  return (
    <div className={classes.player}
        style={{left: coords.x * 40, top: coords.y * 40}}
    >@</div>
  )
}

export default PlayerCell