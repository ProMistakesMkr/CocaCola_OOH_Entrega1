

function Flower(x, y) {
  this.x = x;
  this.y = y;
  this.r = 20;
  this.toDelete = false;

  this.xdir = 1;

 /* this.grow = function () {
    this.r = this.r + 2;
  };*/

  //Eliminar las circulos
  this.destroy = function () {
    this.toDelete = true;
  };

  this.shiftDown = function () {
    this.xdir *= -1;
    this.y += this.r;
  };

  this.move = function () {
    this.x = this.x + this.xdir;
  };

  this.show = function () {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };

  /*this.evaporate = function () {
    this.toDelete = true;
  }*/
}
