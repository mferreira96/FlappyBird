
var bird;
var pipes = [];

// ['started', 'paused', 'ended']
let state_of_game = 'ended';


function setup() {
  var canvas = createCanvas(windowWidth,windowHeight * 0.95);
  canvas.parent('game_screen'); //set his parent

  bird = new Bird();
  pipes.push(new Pipe());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function startGame() {
  state_of_game = 'started'; 
}

function pauseGame(){
  state_of_game = 'paused';
}


// onde devem chamar as funcoes para desenhar e atualizar
function draw() {
  background(0,133,227);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    
    if(bird.alive){
      pipes[i].update();

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    } else {
      state_of_game = 'ended';
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

}

// Aqui e onde devem identificar a tecla que querem usar e a respetiva ação
function keyPressed() {
  if(state_of_game == 'started'){
    if (key == ' ') {
      bird.up();
    }
  }
}

// Actions of the button

$('#play_button').on('click', function(){

  var actual_name = document.getElementById("play_button");

  console.log(actual_name);
});