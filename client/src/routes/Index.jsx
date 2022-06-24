import { useContext, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalContext } from '../_context/AppProvider'
import { Div } from '../_styles/_global'
import NotFound from './NotFound';
import Game from '../_components/Game';


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
  const { theme } = store

  return (
    <Div id='page' className={theme} flex column fills center centertext>
      <Div flex column stretch center centertext>
        <h1>VENTSWEEPER</h1>
        <Game />
        <Suspense><ThemeSwitch /></Suspense>
      </Div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </Div>
  )
}

export default Index;