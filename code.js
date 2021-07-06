//
//Othello
//

//Reason: We have been playing othello in our house and the board always gets bumped.
//A digital version of the game could tally the score, auto flip the coins and never get bumped. 


//global variables
var blueScore = 0;
var redScore = 0;

//blue is 1
//red is 2
var currentColor = 1;
var notCurrentColor = 2; 

var opColorFound=false;
var sameColorFoundSecond=false;
var flipCount=0;

var btnNames = [
  ["a0", "a1","a2","a3","a4","a5","a6","a7"],
  ["b0", "b1","b2","b3","b4","b5","b6","b7"],
  ["c0", "c1","c2","c3","c4","c5","c6","c7"],
  ["d0", "d1","d2","d3","d4","d5","d6","d7"],
  ["e0", "e1","e2","e3","e4","e5","e6","e7"],
  ["f0", "f1","f2","f3","f4","f5","f6","f7"],
  ["g0", "g1","g2","g3","g4","g5","g6","g7"],
  ["h0", "h1","h2","h3","h4","h5","h6","h7"],
  ];

var grid = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,2,1,0,0,0],
  [0,0,0,1,2,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  ];

//Sets the board after players turn
function setBoard(){
  console.log("set board called");
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      if(grid[i][j]==1){
        setProperty(btnNames[i][j],"image","assets/BlueCircleFinal.png");
      }
      if(grid[i][j]==2){
        setProperty(btnNames[i][j],"image","assets/RedCircleFinal.png");
      }
      if(grid[i][j]==0){
        setProperty((btnNames[i])[j],"image","Untitled-drawing-(1).png");
      }
    }
  }
}

//Start Game
onEvent("playGameBtn", "click", function(event) {
  console.log("playGameBtn clicked!");
  setScreen("gameScreen");
  
  setBoard();
  displayTurn();
  updateScore();
});

//Resets the game board so you can play again
onEvent("playAgainBtn", "click", function(event) {
  console.log("playAgainBtn clicked!");
  //reset the board to original setup
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      grid[i][j]=0;
    }
  }
  setBoard();
  
  grid[3][3]=2;
  grid[3][4]=1;
  grid[4][3]=1;
  grid[4][4]=2;
  
  setScreen("WelcomeScreen");
  
});

//Skip turn/Makes it the opposing players turn
onEvent("skipButton", "click", function(event) {
  console.log("skipButton clicked!");
  switchColors();
});

//Shows who's turn it is
function displayTurn(){
  if(currentColor==2){
    setText("turnDisplay","Red Turn");
    //switchColors();
  }else{
    setText("turnDisplay","Blue Turn");
    //switchColors();
  }
}


var tempArray=[];

//Search around the button clicked to see what is red, blue and blank
function searchAround(x,y){
  if(grid[x][y]==1||grid[x][y]==2){
    return;
  }
  
  flipCount=0;
  
  
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,0,1);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  opColorFound=false;
  sameColorFoundSecond=false;  
  tempArray=[];
  search(x,y,0,-1);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,-1);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,0);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,-1,1);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,-1);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,0);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  opColorFound=false;
  sameColorFoundSecond=false;
  tempArray=[];
  search(x,y,1,1);
  if(opColorFound === true &&sameColorFoundSecond===true){
    flipCount++;
  }
  
  if(flipCount==0){
    //playSound("assets/category_alerts/vibrant_wrong_action_hit_1.mp3",false);
  }else{
    switchColors();
    setBoard();
    updateScore();
    //playSound("assets/category_accent/puzzle_game_accent_a_02.mp3",false);
  }
  
  checkForWin();
}

//Companion to Search Around Function, recursivly calls itself in given direction. 
function search(x,y,h,v){
  
  console.log("search called on X+v: "+(x+v)+" y+h: "+(y+h));
 
 if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 && grid[x+v][y+h]==notCurrentColor){
    opColorFound = true;
    
    if (tempArray.length==0){
    tempArray.push([x,y]);
    //console.log("appended to array: (" +tempArray[0][0]+ " , "+tempArray[0][1]+")");
    }
    tempArray.push([x+v,y+h]);
    search(x+v,y+h,h,v);
    //console.log("appended to temp");
  }else if(x+v>=0 && x+v<8 && y+h>=0 && y+h<8 &&grid[x+v][y+h]==currentColor){
    if(opColorFound==true){
      sameColorFoundSecond = true;
    }
    flip();
    
  }else{
    
  }
}

//changes numbers in the grid array to currentColor value
function flip(){
  console.log("flip called");
  for(var i =0;i<tempArray.length;i++){
    grid[tempArray[i][0]][tempArray[i][1]]=currentColor;
    
  }
}

//Switches the variable values for currentColor and notCurrentColor
function switchColors(){
  if(currentColor==1){
    currentColor=2;
    notCurrentColor =1;
    displayTurn();
  }else{
    currentColor=1;
    notCurrentColor =2;
    displayTurn();
  }
}

//Recounts the number of red and blue discs and displays the score. 
function updateScore(){
  blueScore=0;
  redScore=0;
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      if(grid[i][j]==1){
        blueScore++;
      }
      if(grid[i][j]==2){
        redScore++;
      }
    }
  }
  setText("blueScoreBox",""+blueScore);
  setText("redScoreBox",""+redScore);
}

//Counts the number of blue or red squares
function numSquaresColor(x){
  
  var squareCount = 0;
  
  for(var i = 0;i<8;i++){
    for(var j = 0;j<8;j++){
      if(grid[i][j]==x){
        squareCount++;
      }
    }
  }
  return squareCount;
}

//If red,blue or blank squares are zero the game ends. 
function checkForWin(){
  var red = numSquaresColor(2);
  var blue = numSquaresColor(1);
  var blank = numSquaresColor(0);
  
  if(red ==0||blue==0||blank==0){
    setScreen("winLoseScreen");
    winDisplay();
  }
}

//Set the win display
function winDisplay(){
  if(redScore>blueScore){
    //red wins
    setText("winLoseDisplay","RED WINS!!!");
    setProperty("winLoseDisplay","text-color","red");
    setProperty("winLoseDisplay","font-size",36);
  }else if(blueScore>redScore){
    //blue wins
    setText("winLoseDisplay","BLUE WINS!!!");
    setProperty("winLoseDisplay","text-color","blue");
    setProperty("winLoseDisplay","font-size",36);
  }else{
    //its a tie
    setText("winLoseDisplay","Tie");
    setProperty("winLoseDisplay","text-color","grey");
    setProperty("winLoseDisplay","font-size",36);
  }
}

//All the onEvent button commands are below
onEvent("a0", "click", function(event) {
  searchAround(0,0);
  console.log("a0 clicked!");
});
onEvent("a1", "click", function(event) {
  searchAround(0,1);
  console.log("a1 clicked!");
});
onEvent("a2", "click", function(event) {
  searchAround(0,2);
  console.log("a2 clicked!");
});
onEvent("a3", "click", function(event) {
  searchAround(0,3);
  console.log("a3 clicked!");
});
onEvent("a4", "click", function(event) {
  searchAround(0,4);
  console.log("a4 clicked!");
});
onEvent("a5", "click", function(event) {
  searchAround(0,5);
  console.log("a5 clicked!");
});
onEvent("a6", "click", function(event) {
  searchAround(0,6);
  console.log("a6 clicked!");
});
onEvent("a7", "click", function(event) {
  searchAround(0,7);
  console.log("a7 clicked!");
});

//row b button events
onEvent("b0", "click", function(event) {
  searchAround(1,0);
  console.log("b0 clicked!");
});
onEvent("b1", "click", function(event) {
  searchAround(1,1);
  console.log("b1 clicked!");
});
onEvent("b2", "click", function(event) {
  searchAround(1,2);
  console.log("b2 clicked!");
});
onEvent("b3", "click", function(event) {
  searchAround(1,3);
  console.log("b3 clicked!");
});
onEvent("b4", "click", function(event) {
  searchAround(1,4);
  console.log("b4 clicked!");
});
onEvent("b5", "click", function(event) {
  searchAround(1,5);
  console.log("b5 clicked!");
});
onEvent("b6", "click", function(event) {
  searchAround(1,6);
  console.log("b6 clicked!");
});
onEvent("b7", "click", function(event) {
  searchAround(1,7);
  console.log("b7 clicked!");
});

//row c button events
onEvent("c0", "click", function(event) {
  searchAround(2,0);
  console.log("c0 clicked!");
});
onEvent("c1", "click", function(event) {
  searchAround(2,1);
  console.log("c1 clicked!");
});
onEvent("c2", "click", function(event) {
  searchAround(2,2);
  console.log("c2 clicked!");
});
onEvent("c3", "click", function(event) {
  searchAround(2,3);
  console.log("c3 clicked!c");
});
onEvent("c4", "click", function(event) {
  searchAround(2,4);
  console.log("c4 clicked!");
});
onEvent("c5", "click", function(event) {
  searchAround(2,5);
  console.log("c5 clicked!");
});
onEvent("c6", "click", function(event) {
  searchAround(2,6);
  console.log("c6 clicked!");
});
onEvent("c7", "click", function(event) {
  searchAround(2,7);
  console.log("c7 clicked!");
});

//row d button events
onEvent("d0", "click", function(event) {
  searchAround(3,0);
  console.log("d0 clicked!");
});
onEvent("d1", "click", function(event) {
  searchAround(3,1);
  console.log("d1 clicked!");
});
onEvent("d2", "click", function(event) {
  searchAround(3,2);
  console.log("d2 clicked!");
});
onEvent("d3", "click", function(event) {
  searchAround(3,3);
  console.log("d3 clicked!");
});
onEvent("d4", "click", function(event) {
  searchAround(3,4);
  console.log("d4 clicked!");
});
onEvent("d5", "click", function(event) {
  searchAround(3,5);
  console.log("d5 clicked!");
});
onEvent("d6", "click", function(event) {
  searchAround(3,6);
  console.log("d6 clicked!");
});
onEvent("d7", "click", function(event) {
  searchAround(3,7);
  console.log("d7 clicked!");
});
//row e button events
onEvent("e0", "click", function(event) {
  searchAround(4,0);
  console.log("e0 clicked!");
});
onEvent("e1", "click", function(event) {
  searchAround(4,1);
  console.log("e1 clicked!");
});
onEvent("e2", "click", function(event) {
  searchAround(4,2);
  console.log("e2 clicked!");
});
onEvent("e3", "click", function(event) {
  searchAround(4,3);
  console.log("e3 clicked!");
});
onEvent("e4", "click", function(event) {
  searchAround(4,4);
  console.log("e4 clicked!");
});
onEvent("e5", "click", function(event) {
  searchAround(4,5);
  console.log("e5 clicked!");
});
onEvent("e6", "click", function(event) {
  searchAround(4,6);
  console.log("e6 clicked!");
});
onEvent("e7", "click", function(event) {
  searchAround(4,7);
  console.log("e7 clicked!");
});
//row f button events
onEvent("f0", "click", function(event) {
  searchAround(5,0);
  console.log("f0 clicked!");
});
onEvent("f1", "click", function(event) {
  searchAround(5,1);
  console.log("f1 clicked!");
});
onEvent("f2", "click", function(event) {
  searchAround(5,2);
  console.log("f2 clicked!");
});
onEvent("f3", "click", function(event) {
  searchAround(5,3);
  console.log("f3 clicked!");
});
onEvent("f4", "click", function(event) {
  searchAround(5,4);
  console.log("f4 clicked!");
});
onEvent("f5", "click", function(event) {
  searchAround(5,5);
  console.log("f5 clicked!");
});
onEvent("f6", "click", function(event) {
  searchAround(5,6);
  console.log("f6 clicked!");
});
onEvent("f7", "click", function(event) {
  searchAround(5,7);
  console.log("f7 clicked!");
});
//row g button events
onEvent("g0", "click", function(event) {
  searchAround(6,0);
  console.log("g0 clicked!");
});
onEvent("g1", "click", function(event) {
  searchAround(6,1);
  console.log("g1 clicked!");
});
onEvent("g2", "click", function(event) {
  searchAround(6,2);
  console.log("g2 clicked!");
});
onEvent("g3", "click", function(event) {
  searchAround(6,3);
  console.log("g3 clicked!");
});
onEvent("g4", "click", function(event) {
  searchAround(6,4);
  console.log("g4 clicked!");
});
onEvent("g5", "click", function(event) {
  searchAround(6,5);
  console.log("g5 clicked!");
});
onEvent("g6", "click", function(event) {
  searchAround(6,6);
  console.log("g6 clicked!");
});
onEvent("g7", "click", function(event) {
  searchAround(6,7);
  console.log("g7 clicked!");
});
//row h button events
onEvent("h0", "click", function(event) {
  searchAround(7,0);
  console.log("h0 clicked!");
});
onEvent("h1", "click", function(event) {
  searchAround(7,1);
  console.log("h1 clicked!");
});
onEvent("h2", "click", function(event) {
  searchAround(7,2);
  console.log("h2 clicked!");
});
onEvent("h3", "click", function(event) {
  searchAround(7,3);
  console.log("h3 clicked!");
});
onEvent("h4", "click", function(event) {
  searchAround(7,4);
  console.log("h4 clicked!");
});
onEvent("h5", "click", function(event) {
  searchAround(7,5);
  console.log("h5 clicked!");
});
onEvent("h6", "click", function(event) {
  searchAround(7,6);
  console.log("h6 clicked!");
});
onEvent("h7", "click", function(event) {
  searchAround(7,7);
  console.log("h7 clicked!");
});