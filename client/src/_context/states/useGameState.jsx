import { useState } from 'react'

const useGameState = () => {

  const [gameState, setGameStateObj] = useState({
    game: {},
    previous: {},
  })

  const setGameState = (game) => {
    // set previous state
    // set new state
    setGameStateObj((prevState) => ({
      previous: {...prevState.game},
      game: {...game},
    }))
  }

  const initGameState = () => {
    // set previous state
    // set new state
    setGameStateObj((prevState) => ({
      previous: {...prevState.game},
      game: {},
    }))
  }

  return { gameState, setGameState, initGameState }

}

export default useGameState