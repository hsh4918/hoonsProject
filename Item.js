var Item = function(_x,_y,_ox,_oy ){
   this.init(_x,_y,_ox,_oy);
};

Item.prototype.init = function(_x,_y,_ox,_oy ){
   this.context = Game.buffer_context;
   this.src = null;
   this.x = _x;
   this.y = _y;
   this.offsetX = _ox;
   this.offsetY = _oy;

   this isVisible = true;

   this.platformX = 0;
   this.platformY = 0;

};

spiderwdb.prototype.collide = function() {

  if(!this.activated){
   this.activated = ture;
   if(Game.speed > Game.initSpeed + 1)
   Game.speed -= Game.speed * 20 / 80;
  }


};

spiderweb.prototype.draw = function() {

   if(this.isVisible) {
     this.shape.draw();
     this.update();
   }
};

Spiderwdb.prototype.update = funcion() {
  this.shape.x = this.platformX + this.offestX;
  this.shape.y = this.platformY - this.offsetY;
};

var Fire = function(_x, _y, _oX) {//빨라지는 아이템
  //this.constructor(_x, _y, _oX, _oY);
  this.context = Game.buffer_context;
  this.x = _x;
  this.y = _y;
  this.offsetX = _oX;
  this.offsetY = 40;
  this.isVisible = true;

  this.platformX = 0;
  this.platformY = 0;

  this.width = 20;
  this.height = 40;
  this.src = //이미지 넣어야함.

  this.shape = new ImageSprite({
    x: this.x, y: this.y,
    width: this.width, height: this.height,
    src: this.src,
    context: this.context,
    frames: 3
  });

  this.type = 'fire';
};
