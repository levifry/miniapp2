import { createContext } from 'react'

import useGlobalState from './states/useGlobalState'
import useToggleTheme from './effects/useToggleTheme'
import useGameState from './states/useGameState'
import useRefresh from './effects/useRefresh'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {

  const { globalState, setGlobalState } = useGlobalState();
  const { theme, toggleTheme } = useToggleTheme();
  const { gameState, setGameState, initGameState } = useGameState();
  const { refresh } = useRefresh();

  const store = {

    /* STATES */
    globalState,
    theme,
    gameState,

    /* SETTERS */
    setGlobalState,
    setGameState,
    
    /* EFFECTS */
    refresh,
    initGameState,
    toggleTheme,

  }

  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };