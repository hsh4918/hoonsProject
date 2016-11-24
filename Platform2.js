this.itemTypes = ['fire', 'spiderweb', 'goody'];
this.items = [];
this.setItem();
};
//플레이하는 게임의 인터페이스를 보여주게 한다.(게임 화면창 진입하였을 때의 그림)
Platform.prototype.draw = function() {
var that = this;


for (var i = this.bars.length - 1; i >= 0; i--) {
  var bar = this.bars[i];

  if(bar.x < Game.canvas.width)
    bar.draw();

  bar.x = that.shape.x + (i * bar.width);
  bar.y = that.shape.y;
}

//아이템 그리기
if(that.shape.x + that.shape.width > 0 && that.shape.x < Game.canvas.width) {
  for (var i = this.items.length - 1; i >= 0; i--) {
    var item = this.items[i];
    item.draw();
    item.platformX = that.shape.x;
    item.platformY = that.shape.y;
  }
}
};
//
Platform.prototype.setBars = function() {
this.bars = [];
this.numberOfBars = Math.round(this.shape.width / this.barWidth);

for(var i = 0; i < this.numberOfBars; i++) {
  var bar = new ImageShape({
    context: this.context,
    width: this.barWidth,
    height: this.barHeight,
 // �ٴ� ��ġ
    src: 'assets/bar_100.png',
    x: 0,
    y: this.shape.y
  });
  this.bars.push(bar);
}
};
//
Platform.prototype.setItem = function() {
this.items = [];
if(Highscore.score < 500) return false;
//스코어가 500단위를 넘어갈 때 마다 속도가 빨라진다.
var probabilityToHaveItem = PlatformManager.getRandomNum(0 , 10);
var randomX = PlatformManager.getRandomNum(5, this.shape.width - 16);
var randomY = PlatformManager.getRandomNum(16, this.shape.height);
var randomItemType = this.itemTypes[PlatformManager.getRandomNum(0, this.itemTypes.length - 1)];
// Add item ?
if(probabilityToHaveItem > 8) {
  //아이템 기능을 설정한다.
  if(randomItemType == 'fire')
     for (var i=0;i<2;i++ )
    {
    this.items.push(new Fire(this.shape.x, this.shape.y+2*10, randomX+i*20));
   }//fire라는 아이템을 먹을시 점프를 2배 뛴다.
  else if(randomItemType == 'spiderweb')
     this.items.push(new Spiderweb(this.shape.x, this.shape.y, randomX));
    //스파이더라는 아이템은 똥인데 속도가 일시적으로 느려진다.
  else {
    for (var i=0;i<5;i++ )
    {
      this.items.push(new Goody(this.shape.x, this.shape.y, randomX+i*20, randomY+i*20));
    //뼈다귀를 먹으면 한개당 점수가 20점이 올라간다.
    }
  }
}
};
