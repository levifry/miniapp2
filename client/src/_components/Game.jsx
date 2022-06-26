import React, { useState, useEffect } from 'react';
import { createBoard, revealed } from '../_helpers/gameUtils'
import Cell from './Cell';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';

function Game() {

  const [grid, setGrid] = useState([])
  const [nonMinecount, setNonMinecount] = useState(0)
  const [mineLocation, setmineLocation] = useState([])
  const [finished, setFinished] = useState(false)

  const [playWin] = useSound('/assets/sounds/win.mp3', {volume: 0.14, interrupt: false});


  const style={
    display : 'flex',
    flexDirection : 'row',
    width:'fit-content',
    color:'white',
  }

  useEffect(() => {
    freshBoard();
  }, []);

  // Making freshboard at start
  const freshBoard = () => {
    const newBoard = createBoard(11, 8, 14);
    setNonMinecount(11 * 8 - 14);
    setmineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
  }

  const updateFlag = (e, x, y, flagged) => {
    // e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid)) // deep copy of the object
    if (flagged) {
      newGrid[x][y].flagged = false;
    } else {
      if (nonMinecount === 0 && !finished){
        setFinished(true)
        toast.success('Congrats, you found all of the impostors!', { position: "bottom-center", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
        playWin()
        setTimeout(newfresh, 6000);
      }
      newGrid[x][y].flagged = true;
    }
    setGrid(newGrid);
  }

  const newfresh = () => {
    freshBoard();
    setFinished(false)
  }

  const revealcell = (x, y) => {
    let newGrid=JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X"){
			for (let i=0; i < mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed=true;
      }
      setGrid(newGrid);
      setTimeout(newfresh, 2500);
    }
    else{
      if (nonMinecount <= 1 && !finished){
        setFinished(true)
        toast.success('Congrats, you found all of the impostors!', { position: "bottom-center", autoClose: 4000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
        playWin()
        setTimeout(newfresh, 6000);
      }
      let revealedboard = revealed(newGrid, x, y, nonMinecount);
      setGrid(revealedboard.arr);
      setNonMinecount(revealedboard.newNonMines);
    }
    
  }
  
  return (
    <div className="parent board">
      <div>
        <ToastContainer/>
        {grid.map((singlerow, index1)=>{
          return (
            <div style={style} key={index1}>
              {singlerow.map((singlecol, index2)=>{
              return  <Cell details={singlecol} key={index2} updateFlag={updateFlag} revealcell={revealcell}/>
              })}
            </div>
          )
        })}
      </div>
    </div>
  ) 
}
export default Game;