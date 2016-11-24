//�ٴ�
var PlatformManager = {

  platforms: [],

//  randomWidth: [96, 144, 192, 256, 304],
  randomWidth:  [80, 160, 240, 320],//장애물의 넓이
  randomHeight: [20, 40, 60, 80],//장애물의 높이

  GAP: 80,//장애물 사이의 간격
  currentPlatformIndex: 0,
  nextPlattformIndex: 1,
//웹 인터페이스 화살표, 글 위치와 눌렀을 때의 액션을 도와준다.(웹 페이지의 전체적인 액션)
  createPlatforms : function(_num) {
    var pm = PlatformManager;
    var newX, newY, newH, newW;
    for(var i=0; i < _num; i++) {
      if(i == 0) { // First block
        newW = 460; newX = 0;
        pm.platforms.push(new Platform(0, Game.HEIGHT - 20, 460, 20));
      } else {
        newX = newX + newW + pm.GAP;  //장애물의 높이 계산식
        newW = PlatformManager.randomWidth[PlatformManager.getRandomNum(0, PlatformManager.randomWidth.length - 1)];//장애물의 위치 결정
        newH = PlatformManager.randomHeight[PlatformManager.getRandomNum(0, PlatformManager.randomHeight.length - 1)]; //장애물의 위치 결정
        pm.platforms.push(new Platform(newX, Game.HEIGHT - newH, newW, newH));
      }
    }
  },
//reset~transform -> 웹창을 열었을 때 버튼들의 좌표와 쓰여지는 위치를 결정
  reset : function() {
    PlatformManager.platforms = [];
    PlatformManager.createPlatforms(Game.numberOfPlatforms);
  },

  draw : function() {
    for (var i = PlatformManager.platforms.length - 1; i >= 0; i--) {
      var platform = PlatformManager.platforms[i];
      platform.shape.x -= Game.acc;
      platform.draw();
    };
    PlatformManager.update();
  },

  update : function() {
    //마지막 플랫폼에 플랫폼을 추가
    for(var i=0; i < PlatformManager.platforms.length; i++) {
      if(PlatformManager.platforms[i].shape.x + PlatformManager.platforms[i].shape.width < 0) {
        PlatformManager.transform(i);
      }
    }
  },

  transform : function(_index) {
    var nextIndex = _index == 0 ? PlatformManager.platforms.length - 1 : _index - 1;

    newW = PlatformManager.randomWidth[PlatformManager.getRandomNum(0, PlatformManager.randomWidth.length - 1)];
    newH = PlatformManager.randomHeight[PlatformManager.getRandomNum(0, PlatformManager.randomHeight.length - 1)];
    newX = PlatformManager.platforms[nextIndex].shape.x + PlatformManager.platforms[nextIndex].shape.width + PlatformManager.GAP;
    newY = Game.HEIGHT - newH;

    PlatformManager.platforms[_index].shape.x = newX;
    PlatformManager.platforms[_index].shape.width = newW;
    PlatformManager.platforms[_index].shape.height = newH;
    PlatformManager.platforms[_index].shape.y = newY;
    PlatformManager.platforms[_index].setBars();
    PlatformManager.platforms[_index].setItem();
  },

  getRandomNum : function(min, max) {
    if( min > max )
      return( -1 );
    if( min == max )
      return( min );
    return( min + parseInt( Math.random() * ( max-min+1 ) ) );
  }
};

// --------------------------------------------
var Platform = function(_x, _y, _w, _h) {
  this.context = Game.buffer_context;
  this.width = _w;
  this.height = _h;
  this.x = _x;
  this.y = _y;

  this.isVisible = true;

  this.shape = new Rectangle({
    x: _x, y: _y,
    width: _w, height: _h,
    color: '#6B421E',
    context: Game.buffer_context
  });

  // Bar
  this.bars = [];
  this.barWidth = 16;
  this.barHeight = 165;
  this.setBars();
  //
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
