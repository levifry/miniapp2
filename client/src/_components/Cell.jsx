import React, { useContext } from 'react'
import useSound from 'use-sound';
import { GlobalContext } from '../_context/AppProvider'
import useLongPress from '../_helpers/useLongPress';
import { Img } from '../_styles/_global'

export default function Cell({details, updateFlag, revealcell}) {
  
  const { store } = useContext(GlobalContext)
  const { theme, vent } = store

  // Adding three sounds
  const [playBomb] = useSound('/assets/sounds/kill.wav', {volume: 0.14, interrupt: false});
  const [playFlag] = useSound('/assets/sounds/hover.wav', {volume: 0.3, interrupt: false});
  const [playdeFlag] = useSound('/assets/sounds/deflag.wav', {volume: 0.26, interrupt: false});

  // Playing Sound on differents Clicks
  const click = () => {
    if (details.value === 'X' && !details.revealed && !details.flagged) {
      playBomb();
      // console.log(details)
    } else if (details.revealed === false && !details.flagged) {
      vent()
    }

    if (!details.revealed && !details.flagged) {
      // Calling revealcell for specific cell x and y
      revealcell(details.x, details.y)
    }
  }

  // Right Click Function
  const rightclick = (e) => {
    if (details.flagged && !details.revealed) {
      // console.log(details)
      updateFlag(e,details.x, details.y, true)
      playdeFlag();
    } else if (!details.revealed) {
      updateFlag(e,details.x, details.y, false)
      playFlag();
    }
  }

  const onLongPress = () => {
    rightclick();
  };

  const onClick = () => {
    click()
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 300,
  };

  const longPress = useLongPress(onLongPress, onClick, defaultOptions)

  // Rendering the cell component and showing the different values on right and left clicks
  return (
    <div {...longPress} className={`cell f-${details.flagged} v-${details.value} r-${details.revealed} ${theme} `} onContextMenu={rightclick}>
      {!details.revealed && details.flagged ? (
        <Img mid alt='' src='/assets/img/flag.png'/>
      ) : details.revealed && details.value !== 0 ? (
      details.value === "X" ? (
        <Img mid alt='' src='/assets/img/impostor.png'/>
      ) : (
        details.value
      )
      ) : details.revealed && details.value === 0 ? (
        ''
      ) : (
        <Img mid alt='' src='/assets/img/vent.png'/>
      )}
    </div>
  )
}

