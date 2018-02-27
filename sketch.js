
var bird;
var pipes = [];

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('game_screen'); //set his parent


  bird = new Bird();
  pipes.push(new Pipe());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// onde devem chamar as funcoes para desenhar e atualizar
function draw() {
  background(0,133,227);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
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
  if (key == ' ') {
    bird.up();
  }
}