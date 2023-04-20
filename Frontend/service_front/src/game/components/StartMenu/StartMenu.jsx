import React from 'react'
import Button from '../../UI/Button/Button'
import classes from './StartMenu.module.css'

const StartMenu = ({actions}) => {
  const start = actions
  return (
    <div className={classes.menu}>
      <div className={classes.menubar}>
        <Button title="ИГРАТЬ" styles="pixel" color="green" action={start}/>
        <Button title="ВЫЙТИ" styles="pixel" color="darkred"/>
      </div>
    </div>
  )
}

export default StartMenu