class Bird {

    constructor(){
      this.y = height/2;
      this.x = width/4;
      this.diameter = 32
      this.radius = this.diameter / 2;

      this.gravity = 0.6;
      this.lift = -15;
      this.velocity = 0;
      this.alive= true;
    }

    show() {
      fill(255,255,0);
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  
    up() {
      this.velocity += this.lift;
    }
  
    update() {
      this.velocity += this.gravity;
      this.velocity *= 0.9;
      this.y += this.velocity;

      if (this.y + this.radius > height) {
        this.dead();
        this.y = height - this.radius;
        //this.velocity = 0;
        }
  
      if (this.y  - this.radius < 0) {
        this.y = this.radius;
        //this.velocity = 0;
        this.dead();  
      }
  
    }

    dead() {
      this.alive = false;
    }
  
  }