import { useContext } from 'react'
import { GlobalContext } from '../_context/AppProvider'
import { Fix, Img } from '../_styles/_global'

const ThemeSwitch = () => {

  const { store } = useContext(GlobalContext)
  const { theme, toggleTheme } = store

  return (
    <Fix>
      {theme === 'lite' &&
        <Img small alt='' src='./assets/icons/moon.png' onClick={()=>toggleTheme()}/>
      }
      {theme === 'dark' &&
        <Img small alt='' src='./assets/icons/sun.png' onClick={()=>toggleTheme()}/>
      }
    </Fix>
  )
}

export default ThemeSwitch