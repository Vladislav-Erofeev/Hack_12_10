import React, {useEffect, useState} from 'react'
import Toolbar from '../../UI/Toolbar/Toolbar'
import GameHeader from '../../UI/GameHeader/GameHeader'
import classes from './GameUI.module.css'
import GamePlay from '../GamePlay/GamePlay'
import StartMenu from '../StartMenu/StartMenu'
import {useLocation} from "react-router-dom";

const GameUI = () => {

    const [start, setStart] = useState(null)

    const startGame = () => {
        setStart(true)
    }

    const toMenu = () => {
        setStart(false)
    }

    const [audio] = useState(new Audio("fade_to_black.mp3"))
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing])

    const toggle = () => setPlaying(!playing);

    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
        if (location.pathname !== "/game")
            audio.pause();
    }, [location])

    useEffect(() => {
        return () => audio.pause()
    }, [])

    return (
        <div>
            {start
                ? <div className={classes.UI}>
                    <Toolbar/>
                    <GameHeader actions={toMenu}/>
                    <GamePlay/>
                </div>
                : <StartMenu actions={startGame} toggle={toggle} playing={playing}/>

            }
        </div>
    )
}

export default GameUI