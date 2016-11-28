Line = function(_settings) {//선 함수를 세팅
  this.constructor(_settings.context, _settings.startX, _settings.startY, _settings.color);//x축, y축, 색깔을 세팅
  this.endX = _settings.endX;//끝나는 X축 세팅
  this.endY = _settings.endY;//끝나는 y축 세팅
  this.lineWidth = _settings.lineWidth;//선의 길이? 세팅
};
Line.prototype = new Shape();//함수가 정의됐을 때 자동으로 생성되고 초기화되는 prototype
//
Line.prototype.draw = function() {//선그리는 함수를 세팅
  this.canvasContext.strokeStyle = this.color;//윤곽선 색
  this.canvasContext.lineWidth = this.lineWidth;//선의길이
  this.canvasContext.beginPath();//선을 그리기 시작
  this.canvasContext.moveTo(this.x, this.y); //창을 x,y값 좌표로 이동
  this.canvasContext.lineTo(this.endX, this.endY);//어디까지 그리는지
  this.canvasContext.stroke();//stroke를 써야 canvas에 그려짐
  this.canvasContext.closePath();//선 그리기 종료
};
