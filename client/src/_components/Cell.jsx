import React, { useContext } from 'react'
import { GlobalContext } from '../_context/AppProvider'
import useSound from 'use-sound';
import boopSfx from '../_assets/sounds/kill.wav';
import plungerSfx from '../_assets/sounds/vent1.wav';
import plungerSfx2 from '../_assets/sounds/vent2.wav';
import plungerSfx3 from '../_assets/sounds/vent3.wav';
import biteSfx from '../_assets/sounds/hover.wav';
import bomb from '../_assets/img/impostor.png'
import flag from '../_assets/img/flag.png'
import vent from '../_assets/img/vent.png'
import { Img } from '../_styles/_global'

export default function Cell({details, updateFlag, revealcell}) {
  
  const { store } = useContext(GlobalContext)
  const { theme } = store

  // Adding three sounds
  const [playEmpty] = useSound(plungerSfx, {volume: 0.22, interrupt: false});
  const [playEmpty2] = useSound(plungerSfx2, {volume: 0.4, interrupt: false});
  const [playEmpty3] = useSound(plungerSfx3, {volume: 0.4, interrupt: false});
  const [playBomb] = useSound(boopSfx, {volume: 0.18, interrupt: false});
  const [playFlag] = useSound(biteSfx, {volume: 0.3, interrupt: false});

  const style = {
    cellStyle:{
      backgroundColor: details.revealed && details.value !== 0 ? details.value === 'X'
        ? 'green' : '#00226d'
        : details.revealed && details.value === 0 ? '#00226f' : '#000',
    },
  }

  // Playing Sound on differents Clicks
  const click = () => {

    if (details.value === 'X') {
      playBomb();
      console.log(details)
    } else if (details.revealed === false) {
      playEmpty();
    }

    // Calling revealcell for specific cell x and y
    revealcell(details.x, details.y);  
  }

  // Right Click Function
  const rightclick = (e) => {
    if (details.flagged) {
    } else {
      updateFlag(e,details.x, details.y)
      playFlag();
    }
  }

  // Rendering the cell component and showing the different values on right and left clicks
  return (
    <div className={`cell f-${details.flagged} v-${details.value} r-${details.revealed} ${theme} `} style={style.cellStyle} onClick={click} onContextMenu={rightclick}>
      {!details.revealed && details.flagged ? (
        <Img mid alt='' src={flag}/>
      ) : details.revealed && details.value !== 0 ? (
      details.value === "X" ? (
        <Img mid alt='' src={bomb}/>
      ) : (
        details.value
      )
      ) : details.revealed && details.value === 0 ? (
        ''
      ) : (
        <Img mid alt='' src={vent}/>
      )}
    </div>
  )
}

