import React, {useEffect, useState} from 'react'
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

    const [audio, setAudio] = useState(new Audio("fade_to_black.mp3"))
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing])

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        audio.pause();
        console.log(start)
        if (start){
            setAudio(new Audio("master_of_puppets.mp3"))
        }
        else{
            setAudio(new Audio("fade_to_black.mp3"))
        }
    }, [start])

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