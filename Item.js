// Obstacle or Bonus Item
// Parent class
var Item = function(_x, _y, _oX, _oY) {//함수선언
  this.init(_x, _y, _oX, _oY);//any any any
};
Item.prototype.init = function(_x, _y, _oX, _oY) {//프로토타입.
  this.context = Game.buffer_context;
  this.src = null;
  this.x = _x;
  this.y = _y;
  this.offsetX = _oX;
  this.offsetY = _oY;

  this.isVisible = true;

  this.platformX = 0;
  this.platformY = 0;
};
// --------------
var Spiderweb = function(_x, _y, _oX) {//먹으면 느려지는 것
  //this.constructor(_x, _y, _oX, _oY);
  this.context = Game.buffer_context;//내부변수, 좌표이용
  this.x = _x;
  this.y = _y;
  this.offsetX = _oX;
  this.offsetY = 20;
  this.isVisible = true; //시각화

  this.platformX = 0;
  this.platformY = 0;

  this.width = 20;//기본 크기 지정
  this.height = 20;

  this.src = 'assets/foo.png';// 이미지

  this.shape = new ImageShape({
    x: this.x, y: this.y,
    width: this.width, height: this.height,
    src: this.src,
    context: this.context
  });
  this.type = 'spiderweb';

  this.activated = false; //일단은 비활
  this.points = 10;
};
//
Spiderweb.prototype.collide = function() {
  if(!this.activated) {
    this.activated = true; //아이템을 먹으면!
    if(Game.speed > Game.initSpeed + 1)
      Game.speed -= Game.speed * 20 / 80;//스피드 감소
  }
};
//
Spiderweb.prototype.draw = function() {
  if(this.isVisible) {//시각화 하기로한
    this.shape.draw();//그려서 (드로우 함수)
    this.update(); //올리기
  }
};
// 여기까지 11-21
Spiderweb.prototype.update = function() {
  this.shape.x = this.platformX + this.offsetX;
  this.shape.y = this.platformY - this.offsetY;// 좌표계산
};


// --------------
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
  this.src = 'assets/game_obstacle_fire.png';

  this.shape = new ImageSprite({
    x: this.x, y: this.y,
    width: this.width, height: this.height,
    src: this.src,
    context: this.context,
    frames: 3
  });

  this.type = 'fire';
};
//
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
  this.src = 'assets/coin.png';

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
