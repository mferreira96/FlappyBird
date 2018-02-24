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
      if (bird.y < this.top || bird.y > height - this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      this.highlight = false;
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
  
  }