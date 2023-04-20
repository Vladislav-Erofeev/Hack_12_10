import React from 'react'
import classes from './FieldCell.module.css'

const GameField = ({value}) => {
  return (
    <div className={classes.cell}>{value}</div>
  )
}

export default GameField