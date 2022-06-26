import { useContext, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div } from '../_styles/_global'
import NotFound from './NotFound';
import Game from '../_components/Game';
import useSound from 'use-sound';
// import bgSfx from '../_assets/sounds/amb.wav';

const Index = () => {
  
  return (
    <Routes>
      <Route path='/' element={ <Page/> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

const Page = () => {
  const ThemeSwitch = lazy(() => import('../_components/ThemeSwitch'));

  const { store } = useContext(GlobalContext)
  const { theme, playing, setPlaying } = store

  const [playBg] = useSound('/assets/sounds/amb.wav', {volume: 0.09, interrupt: true, loop: true})

  const playIt = () => {
    if (playing === false) {
      playBg()
      setPlaying(true)
    }
  }

  return (
    <Div id='page' onMouseDown={playIt} className={theme} flex column fills center centertext>
      <Div flex column stretch center centertext>
        <h1>Ventsweeper</h1>
        <Game />
        <Suspense><ThemeSwitch /></Suspense>
      </Div>
    </Div>
  )
}

export default Index;