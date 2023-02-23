var blockSize=25;
var rows=20;
var columns=20;
var board;
var context;

var snakeX=blockSize*5;
var snakeY=blockSize*5;

var foodX;
var foodY;

var velocityX=0;
var velocityY=0;

var snakeBody=[];

var gameOver=false;

if(typeof window !== "undefined") {

   window.onload=function(){
      board=document.getElementById("board");
      board.height=rows*blockSize;
      board.width=columns*blockSize;
      context=board.getContext("2d");
  
      placefood();
      document.addEventListener("keyup",changeDirection);
      setInterval(update,100);
  }
  
  function placefood(){
      foodX=Math.floor(Math.random()*columns)*blockSize;
      foodY=Math.floor(Math.random()*rows)*blockSize;
  }
  
  function changeDirection(e){
   if(e.code=="ArrowUp" && velocityY!=1){
      velocityX=0;
      velocityY=-1;
  
   }
   else if(e.code=="ArrowDown" && velocityY!=-1){
      velocityX=0;
      velocityY=1;
      
   }
   else if(e.code=="ArrowLeft" && velocityX!=1){
      velocityX=-1;
      velocityY=0;
      
   }
   else if(e.code=="ArrowRight" && velocityX!=-1 ){
      velocityX=1;
      velocityY=0;
      
   }
  }
  
  function update(){
     if(gameOver){
        return;
     }
      context.fillStyle="black";
      //x,y,width,height
      context.fillRect(0,0,board.width,board.height);
  
      context.fillStyle="red";
      context.fillRect(foodX,foodY,blockSize,blockSize);
  
      if(snakeX==foodX && snakeY==foodY){
        //eats the food put the new food in randomn direction
         snakeBody.push([foodX,foodY]);
         placefood();
      }
  
      for(let i=snakeBody.length-1;i>0;i--){
        //move the body to old
        snakeBody[i]=snakeBody[i-1];
      }
      if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
      }
  
      context.fillStyle="lime";
      snakeX+=velocityX*blockSize;
      snakeY+=velocityY*blockSize;
      context.fillRect(snakeX,snakeY,blockSize,blockSize);
      for(let i=0; i<snakeBody.length;i++){
        //fill with array[1] and array[0]  according to line 76
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
      }
   
      if(snakeX<0 || snakeX>columns.blockSize || snakeY<0 || snakeY>rows.blockSize){
        //snake moves out of the box
        gameOver=true;
        alert("Game over!!!!!")
      }
      for(let i=0;i<snakeBody.length;i++){
        //snake eats itself
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
           gameOver=true;
           alert("Game Over!!!")
        }
      }
  }
  
  
 }

