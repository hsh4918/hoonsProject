
// Base Class
Shape = function(_context, _x, _y, _color) { //도형의 x축, y축, 색깔을 설정
  this.init(_context, _x, _y, _color);//x축,y축, 색깔 초기화
}
Shape.prototype.init = function(_context, _x, _y, _color) { //x축, y축, 색깔 초기화
  this.x = _x || 0; //x축 초기화
  this.y = _y || 0; //y축 초기화
  this.color = _color; // 색깔 초기화
  this.canvasContext = _context; //컨텍스트 초기화
};

// -------------------------------------------------
Circle = function(_settings) { //원만드는 함수를 세팅
  this.constructor(_settings.context, _settings.x, _settings.y, _settings.color); //원의 x축, y축, 색깔을 설정
  this.radius = _settings.radius; // 원의 반지름을 세팅한다.
};
Circle.prototype = new Shape();//함수가 정의됐을 때 자동으로 생성되고 초기화되는 prototype
//
Circle.prototype.draw = function() { //원을 그리는 함수를 세팅
  this.canvasContext.beginPath(); //선을 그릴때 시작하는 함수
  this.canvasContext.fillStyle = this.color;//도형을 채우는 색을 설정
  this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);//호를 그림
  this.canvasContext.fill();//호 안을 채움
};

// -------------------------------------------------
Rectangle = function(_settings) { //직사각형만드는 함수를 세팅
  this.constructor(_settings.context, _settings.x, _settings.y, _settings.color); // 직사각형의 x축, y축, 색깔을 설정.
  this.width = _settings.width; //가로 길이를 세팅한다.
  this.height = _settings.height;//세로 길이를 세팅한다.
};
Rectangle.prototype = new Shape(); //함수가 정의됐을 때 자동으로 생성되고 초기화되는 prototype
//
Rectangle.prototype.draw = function() {//직사각형을 그리는 함수를 세팅
  this.canvasContext.fillStyle = this.color;//도형을 채우는 색을 설정
  this.canvasContext.fillRect(this.x, this.y, this.width, this.height);//x축과 y축과 가로길이, 세로길이를 설정
};
