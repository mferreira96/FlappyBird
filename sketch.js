
var bird;
var pipes;

// ['started', 'paused', 'ended']
let state_of_game = 'ended';


function setup() {
  var canvas = createCanvas(windowWidth,windowHeight * 0.95);
  canvas.parent('game_screen'); //set his parent

  newGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function startGame() {
  state_of_game = 'started'; 

  $('#play_button').text('Pause'); 
  $('#play_button').removeClass('focus');
}

function pauseGame(){
  state_of_game = 'paused';
  $('#play_button').text('Play');
  $('#play_button').removeClass('focus');
}

function endGame(){
  state_of_game = 'ended';
}

function newGame(){
  bird = new Bird();

  pipes = [];
  pipes.push(new Pipe());

  startGame();
}

// onde devem chamar as funcoes para desenhar e atualizar
function draw() {
  background(0,133,227);

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

  if(state_of_game != 'paused'){
    bird.update();

    if (frameCount % 100 == 0) {
      pipes.push(new Pipe());
    }
  }
  
  bird.show();

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

  var button_text = $('#play_button').text();

  if(button_text == "Pause"){  
    pauseGame();
  
  } else if(button_text == "Play"){
    startGame();
  
  }
});


