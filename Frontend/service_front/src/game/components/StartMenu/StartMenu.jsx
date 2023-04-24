import React from 'react'
import Button from '../../UI/Button/Button'
import classes from './StartMenu.module.css'
import {useNavigate} from "react-router-dom"
import useSound from 'use-sound'

const StartMenu = ({actions, toggle, playing}) => {
    const start = actions
    const navigate = useNavigate()
    const [starter] = useSound('../../Audio/creeping_death.mp3')
    return (
        <div className={classes.menu}>
            <h1>12/10 StreetRacing</h1>
            <div className={classes.menubar}>
                <Button title="ИГРАТЬ" styles="pixel" color="green" action={() => {
                    start()
                    starter()
                }}/>
                <Button title="ВЫЙТИ" styles="pixel" color="darkred" action={() => navigate("/")}/>
                <Button title={playing ? "ВЫКЛ МУЗЫКУ" : "ВКЛ МУЗЫКУ"} action={toggle} styles="pixel" color="red"/>
            </div>
        </div>
)
}

export default StartMenu