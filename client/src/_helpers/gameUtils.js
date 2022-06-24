//
//  CREDITS TO devansh6 for the game logic
//  https://github.com/devansh5/
//

export const createBoard = (row, col, mines) => {

  // Board for storing the values for each cell
  let board = [];

  // Tracking the minelocation 
  let mineLocation = [];

  // Create blank board
  for (let x = 0; x < row; x++) {
    let subCol = [];
    for (let y = 0; y < col; y++) {
    subCol.push({
      value: 0,
      revealed: false,
      x: x,
      y: y,
      flagged: false,
    });
    }
    board.push(subCol);
  }
  
  // Randomize Bomb Placement
  let minesCount = 0;
  while (minesCount < mines) {
    // Implementing random function
    let x = random(0, row - 1);
    let y = random(0, col - 1);
  
    // placing bomb at random location(x,y) on board[x][y]
    if (board[x][y].value === 0) {
    board[x][y].value = "X";
    mineLocation.push([x, y]);
    minesCount++;
    }
  }
  
  // Increasing the value of specific cell 
  // If the cell has mines increasing the cell value by 1.
  // Add Numbers
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j].value === "X") {
        continue;
      }
    
      // Top
      if (i > 0 && board[i - 1][j].value === "X") {
        board[i][j].value++;
      }
    
      // Top Right
      if (
        i > 0 &&
        j < col - 1 &&
        board[i - 1][j + 1].value === "X"
      ) {
        board[i][j].value++;
      }
    
      // Right
      if (j < col - 1 && board[i][j + 1].value === "X") {
        board[i][j].value++;
      }
    
      // Botoom Right
      if (
        i < row - 1 &&
        j < col - 1 &&
        board[i + 1][j + 1].value === "X"
      ) {
        board[i][j].value++;
      }
    
      // Bottom
      if (i < row - 1 && board[i + 1][j].value === "X") {
        board[i][j].value++;
      }
    
      // Bottom Left
      if (
        i < row - 1 &&
        j > 0 &&
        board[i + 1][j - 1].value === "X"
      ) {
        board[i][j].value++;
      }
    
      // Left
      if (j > 0 && board[i][j - 1].value === "X") {
        board[i][j].value++;
      }
    
      // Top Left
      if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
        board[i][j].value++;
      }
    }
  }
  return { board, mineLocation };
};
  
  // Random function used for generating random value of x & y
const random = (min = 0, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const revealed = (arr,x,y,newNonMines) => {
  
  // all the cells which are adjaced to zero must be stored in the array 
  // so that it can be revealed later

  let show=[];
  show.push(arr[x][y]);
  while(show.length!==0){
    let one=show.pop();
    let i=one.x;
    let j=one.y;
    if(!one.revealed){
      newNonMines--;
      one.revealed=true;
    }
    if(one.value !==0){
      break;
    }

    // top left 

    if(
      i>0 && 
      j>0 &&
      arr[i-1][j-1].value===0 &&
      !arr[i-1][j-1].revealed
    )
    {
      show.push(arr[i-1][j-1]);
    }

    // bottom right

    if(
      i<arr.length-1 &&
      j<arr[0].length-1 &&
      arr[i+1][j+1].value===0 &&
      !arr[i+1][j+1].revealed
    ){
      show.push(arr[i+1][j+1]);
    }

    // top right

    if(
      i>0 &&
      j<arr[0].length-1 &&
      arr[i-1][j+1].value===0 &&
      !arr[i-1][j+1].revealed
    ){
      show.push(arr[i-1][j+1]);
    }

    // bottom left 

    if(
      i<arr.length-1 &&
      j>0 &&
      arr[i+1][j-1].value===0 &&
      !arr[i+1][j-1].revealed
    ){
      show.push(arr[i+1][j-1]);
    }

    // top 
    if(
      i>0 &&
      arr[i-1][j].value===0 &&
      !arr[i-1][j].revealed 
    ){
      show.push(arr[i-1][j]);
    }

    // right

    if(
      j<arr[0].length-1 &&
      arr[i][j+1].value===0 &&
      !arr[i][j+1].revealed
    ){
      show.push(arr[i][j+1]);
    }

    // bottom

    if(
      i<arr.length-1 &&
      arr[i+1][j].value===0 &&
      !arr[i+1][j].revealed
    ){
      show.push(arr[i+1][j]);
    }

    // left

    if(
      j>0 &&
      arr[i][j-1].value===0 &&
      !arr[i][j-1].revealed
    ){
      show.push(arr[i][j-1]);
    }


    // start revealing the item

    if (
      i > 0 &&
      j > 0 &&
      !arr[i - 1][j - 1].revealed
    ) {
      //Top Left Reveal
  
      arr[i - 1][j - 1].revealed = true;
      newNonMines--;
    }
  
    if (j > 0 && !arr[i][j - 1].revealed) {
      // Left Reveal
      arr[i][j - 1].revealed = true;
      newNonMines--;
    }
  
    if (
      i < arr.length - 1 &&
      j > 0 &&
      !arr[i + 1][j - 1].revealed
    ) {
      //Bottom Left Reveal
      arr[i + 1][j - 1].revealed = true;
      newNonMines--;
    }
  
    if (i > 0 && !arr[i - 1][j].revealed) {
      //Top Reveal
      arr[i - 1][j].revealed = true;
      newNonMines--;
    }
  
    if (i < arr.length - 1 && !arr[i + 1][j].revealed) {
      // Bottom Reveal
      arr[i + 1][j].revealed = true;
      newNonMines--;
    }
  
    if (
      i > 0 &&
      j < arr[0].length - 1 &&
      !arr[i - 1][j + 1].revealed
    ) {
      // Top Right Reveal
      arr[i - 1][j + 1].revealed = true;
      newNonMines--;
    }
  
    if (j < arr[0].length - 1 && !arr[i][j + 1].revealed) {
      //Right Reveal
      arr[i][j + 1].revealed = true;
      newNonMines--;
    }
  
    if (
      i < arr.length - 1 &&
      j < arr[0].length - 1 &&
      !arr[i + 1][j + 1].revealed
    ) {
      // Bottom Right Reveal
      arr[i + 1][j + 1].revealed = true;
      newNonMines--;
    }
  }

  return {arr,newNonMines}

}