import { useContext } from 'react'
import useSound from 'use-sound';
import { GlobalContext } from '../_context/AppProvider'
import { Fix, Img } from '../_styles/_global'

const ThemeSwitch = () => {

  const { store } = useContext(GlobalContext)
  const { theme, toggleTheme } = store

  const [playSun] = useSound('/assets/sounds/turnon.wav', {volume: 0.2, interrupt: true})
  const [playMoon] = useSound('/assets/sounds/turnoff.wav', {volume: 0.2, interrupt: true})

  return (
    <Fix className="pointer">
      {theme === 'lite' &&
        <Img small alt='' src='/assets/img/moon.png' onClick={()=>{playMoon(); toggleTheme()}}/>
      }
      {theme === 'dark' &&
        <Img small alt='' src='/assets/img/sun.png' onClick={()=>{playSun(); toggleTheme()}}/>
      }
    </Fix>
  )
}

export default ThemeSwitch