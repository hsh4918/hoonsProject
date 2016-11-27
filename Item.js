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
//  this.src = //이미지 넣어야함.

  this.shape = new ImageSprite({
    x: this.x, y: this.y,
    width: this.width, height: this.height,
    src: this.src,
    context: this.context,
    frames: 3
  });

  this.type = 'fire';
};
Fire.prototype.collide = function() {
  Player.jump(true);//이단 점프
};
//
Fire.prototype.draw = function() {
  if(this.isVisible) {
    this.shape.draw();
    this.update();
  }
};
//
Fire.prototype.update = function() {
  this.shape.x = this.platformX + this.offsetX;
  this.shape.y = this.platformY - this.offsetY;
};


// --------------
var Goody = function(_x, _y, _oX, _oY) {
  //this.constructor(_x, _y, _oX, _oY);

  this.context = Game.buffer_context;
  this.src = null;
  this.x = _x;
  this.y = _y;
  this.offsetX = _oX;
  this.offsetY = _oY;
  this.isVisible = true;

  this.platformX = 0;
  this.platformY = 0;

  this.width = '30';
  this.height = '30';
//  this.src = '';//사진 아직

  this.radX = parseInt(this.width * 2);
  this.radY = parseInt(this.width * 2);
  this.angle = 0;
  this.orbitSpeed = this.width / 1000;//돌아가는 속도를 넓이의 1000분의 1로 대입
  this.centerX = this.x;
  this.centerY = this.y;//센터 xy를 xy축으로 대입

  this.shape = new ImageShape({
    x: this.x, y: this.y,
    width: this.width, height: this.height,
    src: this.src,
    context: this.context
  });

  this.type = 'goody';
  this.points = 30;
};
//Goody.prototype = new Item();
//
Goody.prototype.collide = function() {
  this.isVisible = false;//먹으면 안보이게 하고
  Highscore.addPoint(this.points);//아이템 점수를 점수에 더하고
  Highscore.blink();//글씨 깜박깜박
};
//
Goody.prototype.draw = function() {
  if(this.isVisible) {
    this.shape.draw();
    this.update();
  }
};
//
Goody.prototype.update = function() {
  this.shape.x = this.platformX + Math.cos(this.angle) * this.radX;
  this.shape.y = this.platformY - this.offsetY + Math.sin(this.angle) * this.radY;
  this.angle += this.orbitSpeed;//스피드에 따라 앵글 바꿔주는거
};
