
var bird;
var pipes;

// ['started', 'paused', 'ended', 'newGame']
let state_of_game;

let output_state;

let myFrameCount;

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('game_screen'); //set his parent

  myFrameCount = 0;
  newGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function startGame() {
  state_of_game = 'started';
  output_state = ""; 
}

function pauseGame(){
  state_of_game = 'paused';
  output_state = "PAUSE";
}

function endGame(){
  state_of_game = 'ended';
  output_state = "GAME OVER";
}

function newGame(){
  bird = new Bird();

  pipes = [];
  pipes.push(new Pipe());

  frameCount = 0;

  state_of_game = 'newGame';
  output_state = "START";
}

// onde devem chamar as funcoes para desenhar e atualizar
function draw() {
  background(0,133,227);
  updateFrameCount();

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    
    if(state_of_game == 'started'){
      pipes[i].update();

      pipes[i].hits(bird);
      
      if(!bird.alive){
        endGame();
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    } 
  }

  if(state_of_game != 'paused' && state_of_game != 'newGame'){
    bird.update();

    if (myFrameCount % 100 == 0) {
      pipes.push(new Pipe());
    }

  }

  textSize(32);
  fill(0);
  text('Score: ' + Math.floor(myFrameCount/100),30,30);


  textSize(width/10);
  var x = (width - textWidth(output_state)) / 2; 
  text(output_state,x,height/2);

  bird.show();

}

// Aqui e onde devem identificar a tecla que querem usar e a respetiva ação
function keyPressed() {
  switch (state_of_game) {
    case 'newGame':
      if (key == ' '){
        startGame();
      }
      break;
    case 'started':
      if (key == ' ') {
          bird.up();
      }else if (keyCode === ESCAPE){
        pauseGame();
      }
      break;
    case 'paused':
      if (keyCode === ESCAPE){
        startGame();
      }
      break;
    case 'ended':  
      if (keyCode == 78){    
        newGame();
      }
      break;
    default:
      break;
  }

}

function updateFrameCount(){
  switch(state_of_game){
    case 'started':
      myFrameCount++;
      break;
    case 'paused':
      break;
    case 'ended':
      break;
    case 'newGame':
      myFrameCount = 0;
      break;
    default:
      break;      
  }
}



