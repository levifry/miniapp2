import { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useToggleTheme from './effects/useToggleTheme'
import useGameState from './states/useGameState'
import useRefresh from './effects/useRefresh'
import useVent from './effects/useVent'
import usePlaying from './states/usePlaying'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();
  const { playing, setPlaying } = usePlaying();
  const { theme, toggleTheme } = useToggleTheme();
  const { gameState, setGameState, initGameState } = useGameState();
  const { refresh } = useRefresh();
  const { vent } = useVent();

  const store = {

    /* STATES */
    globalState,
    theme,
    gameState,
    playing,

    /* SETTERS */
    setGlobalState,
    setGameState,
    setPlaying,
    
    /* EFFECTS */
    refresh,
    initGameState,
    toggleTheme,
    vent,

  }

  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };