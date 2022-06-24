import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../_context/AppProvider'
// import { eHandler, noCallback } from '../_helpers/eHandler';

const Game = () => {
  
  let game = {
    player: 2,
    hp: 24,
    mines: [0,0,1,0,1]
  }

  const clickHandler = (e, path) => {
    switch(path) {
      case 1:
        setGameState(game)
        break;
      case 2:
        initGameState()
        break;
      case 3:
        refresh()
        break;
      default:
        console.log('unhandled click event')
    }
  
  }

  const { store } = useContext(GlobalContext)
  const { gameState, setGameState, initGameState, refresh } = store

  return(
    <div className="page">
      {JSON.stringify(gameState)}
      {console.log(gameState)}
      <button onClick={(e)=>clickHandler(e,1)}>change</button>
      <button onClick={(e)=>clickHandler(e,2)}>init</button>
      <button onClick={(e)=>clickHandler(e,3)}>refresh</button>
    </div>
  )
}

export default Game