class Pipe {

    constructor() {

      // ou seja a altura é dividida em 4 partes, sendo que o espaço ficara sempre nos quadrantes centrais do canvas
      let randomValue = Math.floor(Math.random() * (height * (3/4) - height * (1/4))) + (height * (1/4));
      this.space = 130;
      
      if(randomValue + this.space >= height){
        this.top = randomValue - this.space;
        this.bottom = height - randomValue;
      } else {
        this.top = randomValue;
        this.bottom = height - (randomValue + this.space);
      }

      this.x = width;
      this.w = 30;
      this.speed = 2;  
    
      this.highlight = false;
    }
  

    hits(bird) {
      // hits on the left wall
      if (this.inside(this.x, this.top, bird) || this.inside(this.x + this.w, this.top, bird)) {
        // hits on the corners of the top pipe
        this.highlight = true;
      } else if (this.inside(this.x, height - this.bottom, bird) || this.inside(this.x + this.w, height - this.bottom, bird)){
        // hits on the corners of the bottom pipe
        this.highlight = true;
      } else if (bird.y - bird.radius <= this.top || bird.y + bird.radius >= height - this.bottom){
        if(bird.x + bird.radius >= this.x && bird.x + bird.radius <= this.x + this.w)
          this.highlight = true;
      }
       else {
        this.highlight = false;
      }

      if(this.highlight){
        bird.dead();
        return true;
      }
      else 
        return false;  
    }
  
    show() {
      fill(0,160,68);
      if (this.highlight) {
        fill(255, 0, 0);
      }
      rect(this.x, 0, this.w, this.top);
      rect(this.x, height-this.bottom, this.w, this.bottom);
    }
  
    update() {
      this.x -= this.speed;
    }
  
    offscreen() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
    
    inside(x, y, bird) {
      if ( (x - bird.x) ** 2 + (y - bird.y) ** 2 <= bird.radius ** 2)
        return true;
      else
        return false;
    }
  }