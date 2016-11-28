
//parallax scrolling이라는 js기반의 화면 표현 방법
//parallax.js가 할 일은 문서 시체의 시작 부분에있는 각 시차 이미지의 고정 위치 요소를 만드는 것이다.
//이 거울 요소는 다른 요소 뒤에 위치하여 대상 객체의 위치와 크기와 일치한다.
//출처 http://blog.naver.com/justerkr/220393399522
var Parallax = function(_x, _y, _w, _h, _src, _moveSpeed) {
	this.context = Game.buffer_context;
	this.width = _w;
	this.height = _h;
	this.src = _src;
	this.x = 0;
	this.y = 0;

	this.moveSpeed = _moveSpeed;


	this.plains = [];
	var newX = this.x;
	var numOfShapes = Math.max(Math.round((Game.WIDTH * 2) / this.width), 2);

	for (var i = 0; i <= numOfShapes - 1; i++) {
		this.plains.push(new ImageShape({
			x : newX,
			y : this.y,
			src : this.src,
			context : this.context,
			width : this.width,
			height : this.height
		}));
		newX += this.width;
	}
	this.canvasWidth = Game.WIDTH;
};

Parallax.prototype.draw = function() {
	for (var i = 0; i < this.plains.length; i++) {
		if (this.plains[i].x <= this.canvasWidth)
			this.plains[i].draw();
		this.update(i);
	}
};
//
Parallax.prototype.update = function(i) {
	this.plains[i].x -= this.moveSpeed * Game.elapsed; //움직임 스피드 * 게임 스피드

	if (this.plains[i].x + this.plains[i].width <= 0) {
		this.plains[i].x = i == 0 ? this.plains[i].x = this.plains[this.plains.length - 1].x
				+ this.width
				: this.plains[i].x = this.plains[i - 1].x + this.width;
	}
};
