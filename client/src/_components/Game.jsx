import React, { useState, useEffect } from 'react';
import { createBoard, revealed } from '../_helpers/gameUtils'
import Cell from './Cell';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Game() {

  const [grid, setGrid] = useState([])
  const [nonMinecount, setNonMinecount] = useState(0)
  const [mineLocation, setmineLocation] = useState([])

  const style={
    display : 'flex',
    flexDirection : 'row',
    width:'fit-content',
    color:'white',
  }

  useEffect(() => {
    freshBoard();
  }, []);

  // Making freshboard atstart
  const freshBoard = () => {
    const newBoard = createBoard(10, 10, 20);
    setNonMinecount(10 * 10 - 20);
    setmineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
  }

  const updateFlag = (e, x, y, flagged) => {
    // e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid)) // deep copy of the object
    if (flagged) {
      newGrid[x][y].flagged = false;
    } else {
      newGrid[x][y].flagged = true;
    }
    setGrid(newGrid);
  }

  const newfresh = () => {
    freshBoard();
  }

  const revealcell = (x,y) => {
    let newGrid=JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X"){
			for (let i=0; i<mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed=true;
      }
      setGrid(newGrid);
      setTimeout(newfresh, 2500);
    }
    if (nonMinecount === 0){
      toast.success('Congrats, you found all of the impostors!', { position: "top-center", autoClose: 1000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      setTimeout(newfresh, 10000);
    }
    else{
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