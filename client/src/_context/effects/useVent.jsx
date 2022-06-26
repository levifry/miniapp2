import { useState } from 'react'
import useSound from 'use-sound';
import vent1 from '../../_assets/sounds/vent1.wav';
import vent2 from '../../_assets/sounds/vent2.wav';
import vent3 from '../../_assets/sounds/vent3.wav';

const useVent = () => {

  const [playVent1] = useSound(vent1, {volume: 0.22, interrupt: false});
  const [playVent2] = useSound(vent2, {volume: 0.22, interrupt: false});
  const [playVent3] = useSound(vent3, {volume: 0.22, interrupt: false});

  const [ventState, setVentState] = useState(1)

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const vent = () => {
    switch(ventState) {
      case 1:
        playVent1()
        setVentState(random(1, 3))
        break;
      case 2:
        playVent2()
        setVentState(random(1, 3))
        break;
      case 3:
        playVent3()
        setVentState(random(1, 3))
        break;
      default:
        playVent1()
        break;
    }
  }

  return { vent }

}

export default useVent