
var bird;
var pipes;

// ['started', 'paused', 'ended', 'newGame']
let state_of_game;

let myFrameCount = 0;

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('game_screen'); //set his parent

  newGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function startGame() {
  state_of_game = 'started'; 
  running = true;
}

function pauseGame(){
  state_of_game = 'paused';
}

function endGame(){
  state_of_game = 'ended';
  running = false;
}

function newGame(){
  bird = new Bird();

  pipes = [];
  pipes.push(new Pipe());

  frameCount = 0;

  state_of_game = 'newGame';
}

// onde devem chamar as funcoes para desenhar e atualizar
function draw() {
  background(0,133,227);
  updateFrameCount();

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    
    if(state_of_game == 'started'){
      pipes[i].update();

      if(pipes[i].hits(bird)){
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
        console.log('p was pressed to pause the game');
        pauseGame();
      }
      break;
    case 'paused':
      if (keyCode === ESCAPE){
        console.log('p was pressed to restart the game');
        startGame();
      }
      break;
    case 'ended':  
      if (keyCode == 78){
        console.log('n was pressed to start a new game');    
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
      myFrameCount = 0;
      break;
    case 'newGame':
      myFrameCount = 0;
      break;
    default:
      break;      
  }
}



