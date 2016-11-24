ImageShape = function(_settings) {//이미지만드는 함수를 세팅
  this.constructor(_settings.context, _settings.x, _settings.y);//x축,y축 설정
  this.width = _settings.width;//가로길이를 설정
  this.height = _settings.height;//세로길이를 설정
  this.src = _settings.src;//소스파일의 경로
  this.img = new Image();//이미지객체생성
  this.img.src = this.src; //이미지소스파일경로
  this.angle = _settings.angle;// 각을 설정
};
ImageShape.prototype = new Shape();//함수가 정의됐을 때 자동으로 생성되고 초기화되는 prototype.
//
ImageShape.prototype.draw = function() {//이미지 그리는 함수를 세팅
  //this.canvasContext.save();
  //this.canvasContext.rotate(this.angle * Math.PI  / 180);
  this.canvasContext.drawImage(this.img, this.x, this.y, this.width, this.height);//이미지의 x축, y축, 가로길이, 세로길이를 설정
  //this.canvasContext.restore();
};

// -------------------------------------------------
ImageSprite = function(_settings) {//복합 이미지 하나를 하나의 이미지로 만드는 함수를 세팅
  this.constructor(_settings.context, _settings.x, _settings.y);//x축, y축 설정
  this.width = _settings.width;//가로길이를 설정
  this.height = _settings.height;//세로길이를 설정
  this.src = _settings.src;//소스파일의 경로
  this.img = new Image();//이미지객체 생성
  this.img.src = this.src;//이미지소스파일경로

  this.actualFrame = 0; //프레임을 0 으로초기화
  this.frames = _settings.frames;//프레임을 세팅
  this.interval = 0; //간격 = 0;
};
ImageSprite.prototype = new Shape();//함수가 정의됐을 때 자동으로 생성되고 초기화되는 prototype
//
ImageSprite.prototype.draw = function() { //복합 이미지 하나를 하나의 이미지로 그리는 함수를 세팅
  if (this.interval == this.frames ) {  //프레임크기와 간격이 같고
    if (this.actualFrame == this.frames) {  //actualFrame 와 frames가 같으면
        this.actualFrame = 0; //프레임을 0으로초기화
    } else {
        this.actualFrame++;//아니면 프레임을 1씩 더함
    }
    this.interval = 0;//간격 = 0;
  }
  this.interval++; //간격을 1씩 더함
  this.canvasContext.drawImage(this.img, this.width * this.actualFrame, 0, this.width, this.height, this.x, this.y, this.width, this.height);
};//이미지 크기를 정함.
