
window.requestAnimFrame = (function(){
  return  (window.requestAnimationFrame      ||
		  //requestAnimationFrame는 브라우저에 애니메이션을 수행하고 브라우저가 다음 다시 그리기 전에 애니메이션을 업데이트하기 위해 지정된 함수를 호출하도록 요청합니다
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          });
})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame||
        window.mozCancelRequestAnimationFrame   ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame    ||
        clearTimeout
} )();

var Game = {
  drawInterval: null,
  blocks: [],
  player: [],
  canvas: null,
  buffer: null,
  context: null,
  _canvasContext: null,
  // ---------------
  initSpeed : 100,
  initMarkerPoint : 200,
  isDrawing: true,
  reqAnimation: null,
  acceleration: 0.2,
  MAX_SPEED: 400,
  numberOfPlatforms: 4,
  // ---------------
  elapsed : 0,

  init : function() {
    Game.canvas = document.getElementById("canvas");
    Game.buffer = document.getElementById("buffer-canvas");
    Game.context = Game.canvas.getContext("2d");
    Game.buffer_context = Game.buffer.getContext("2d");

    Game.HEIGHT = Game.canvas.height;
    Game.WIDTH = Game.canvas.width;
    Game.buffer.width = Game.canvas.width;
    Game.buffer.height = Game.canvas.height;

    // Preload  ����
    var iBar = new Image();
    iBar.src = 'assets/bar_100se.png';
    iBar.src = 'assets/Bg2.png';
    iBar.src = 'assets/Bg1.png';

    // Add backgrounds ���ȭ��
    Game.backgrounds = [];
    Game.backgrounds.push(new Parallax(0, 0, 1360, 381, "assets/Bg2.png", 20));
    Game.backgrounds.push(new Parallax(0, 0, 1360, 381, "assets/Bg1.png", 40));
    // Prepare player ��
    Player.init();
    // Create Platforms
    PlatformManager.createPlatforms(Game.numberOfPlatforms);

    Game.speed = Game.initSpeed;
    //
    Highscore.init();
    Game.markerPoint = Game.initMarkerPoint;
    Highscore.pullScoreOnline();

    // Events ��ư
    $('#restartButton').show();
//	$('#saveScoreButton').show();
	$('#showHighscore').show();
	$('#infoButton').show();
    Game.slider = new SliderDiv();
    $(document).keydown($.proxy(Game.keyEvent, this));
    $('#canvas').click(function(){ Player.jump(); });
    $('#restartButton').click(function(){ Game.reset(); });
	$('#showHighscore').click(function(){Game.Highscore(); });
    $('#infoButton').click(function(){ Game.showInfo(); });
	//$('#canvas1').click(function(){ Player.jump(); });
	//ĳ���� �װ� �� �� ������ ��ư
	$('#showHighscore1').click(function(){Game.Highscore(); });
    $('#restartButton1').click(function(){ Game.reset();});
    $('#infoButton1').click(function(){ Game.showInfo(); });
    Game.isDrawing = true;
  },
//
  start : function() {
    $('#canvas').addClass('canvasGameBackground');
    $('#highscore').show();
	backbgmSoundNow();
    Game.then = Date.now();
    Game.rate();
  },
//ĳ���� �װ� �� �� ������ ��ư
 stop : function() {
  $('#restartButton1').show();
  $('#showHighscore1').show();
  $('#infoButton1').show();
$('#canvas1').hide();
$('#canvas').show();
endingSound.pause();
  Player.isVisible = false;
  Game.isDrawing = false;
  Game.speed = 0;
  cancelRequestAnimFrame(Game.reqAnimation);
  },
	  // ĵ���� 1 ���̰� �ϱ�
stop1 : function() {
  $('#canvas1').show();
  $('#canvas').hide();
  $('#highscore').hide();
  endingSoundNow();
  backbgmSound.pause();
  Player.isVisible = false;
  Game.isDrawing = false;
  Game.speed = 0;
  cancelRequestAnimFrame(Game.reqAnimation);
},

  reset : function() {
    // Reset game object
    Game.clear();
    Game.isDrawing = true;
    Game.speed = Game.initSpeed;
    // Reset objects
    Player.reset();
    PlatformManager.reset();
    Highscore.reset();
    // Clear interface
    $('#restartButton').hide();
    $('#showHighscore').hide();
    $('#infoButton').hide();
	$('#restartButton1').hide();
    $('#showHighscore1').hide();
    $('#infoButton1').hide();
    //
    Game.markerPoint = Game.initMarkerPoint;
    //
    Game.start();
  },

  clear : function() {
    Game.buffer.width = Game.buffer.width;
    Game.canvas.width = Game.canvas.width;
  },

  draw : function() {
    if(Game.isDrawing) {
      Game.clear();

      // ---------
      // 배경화면
      Game.backgrounds.forEach(function(background){
        background.draw();
      });

      //마커
      Highscore.drawMarkers();

      //플랫폼
      PlatformManager.draw();

      //플레이어ㅕ
      Player.draw();

      // ---------
      Game.context.drawImage(Game.buffer, 0, 0);
    } else {
      Game.canvasToBW();
    }
  },

  update : function(elapsed) {
    Game.elapsed = elapsed;
    if(Game.speed < Game.MAX_SPEED)
      Game.speed += Game.acceleration;
    Game.acc = Game.speed * elapsed;

    Game.markerPoint -= Game.acc;
    Game.checkPlayer();

    if(elapsed < 1) elapsed = 1;
    Highscore.addPoint(Math.abs(elapsed));
	$('#canvas').addClass('canvasGameBackground');
  },

  rate : function() {
    if(Game.isDrawing) {
      var now = Date.now();
      var delta = now - Game.then;

      Game.update(delta / 1000);
      Game.draw();

      Game.then = now;
      Game.reqAnimation = requestAnimFrame(function() { Game.rate(); } );
    }
  },

checkPlayer : function() {
  // Player didnt mind the gap
  if(Player.shape.y + Player.shape.height >= Game.HEIGHT) {
Game.stop1();
  //게임 멈춤
  return false;
  }

    //플레이어 점프
    if(Player.isJumping || Player.isFalling){
      Player.checkJump();
	jumpSound.play();//캐릭터가 점프할때 점프사운드 시작
	}

    // -----------------------------------------
    //플랫폼과 충돌되는지 확인
    for (var i = PlatformManager.platforms.length - 1; i >= 0; i--) {
      var e = PlatformManager.platforms[i];
      var ind = i;

      // Current shape after player
      if(e.shape.x < Player.x) {
        PlatformManager.currentPlatformIndex = ind;
        PlatformManager.nextPlattformIndex = (ind == PlatformManager.platforms.length - 1) ? 0 : ind+1;

      }

      // Collision with platform item
      e.items.forEach(function(item) {
        if(!item.isVisible) return false;
        if(Game.isColliding(item.shape, Player.shape) ) {
          item.collide();
        }
      });

      var nextShape = PlatformManager.platforms[PlatformManager.nextPlattformIndex].shape;
      var currentShape = PlatformManager.platforms[PlatformManager.currentPlatformIndex].shape;
      // Player in gap
      if(Player.shape.x > (currentShape.x + currentShape.width + 5) && (Player.shape.x + Player.shape.width) < (nextShape.x) )  {
        if(!Player.isJumping) {
          Player.isFalling = true;
          Player.groundY = Game.canvas.height;
        }

        // 벽에서 점프하다 떨어졌을 경우
        if(Player.shape.y + Player.shape.height > nextShape.y && Player.shape.x + Player.shape.width > nextShape.x) {
          Player.isFalling = true;
          Player.shape.x -= Game.Speed;//사망하고 스피드를 줄인다.
        }
      // Player on platform
      } else {
        var platformToCheck;
        // Player on currentPlatform
        if(Player.shape.x >= currentShape.x && Player.shape.x + Player.shape.width <= currentShape.x + currentShape.width)
          platformToCheck = currentShape;
        else
          platformToCheck = nextShape;

        if(Player.shape.y + Player.shape.height <= platformToCheck.y )
          Player.groundY = platformToCheck.y

      }
    }
    // -----------------------------------------
  },
	  Highscore : function() {
    Game.slider.moveTo(1);
  },
  showInfo : function() {
    Game.slider.moveTo(2);
  },


  isColliding : function(obj1, obj2) {
  if( obj1.x > obj2.x &&
      obj1.x < (obj2.x + obj2.width) &&
      obj1.y > obj2.y &&
      obj1.y < ( obj2.y +  obj2.height) ) {
        return true;
      }
    return false;
  },

  canvasToBW : function () {
    var imgd = Game.buffer_context.getImageData(0, 0, Game.WIDTH, Game.HEIGHT);
    var pix = imgd.data;
    for (var i = 0, n = pix.length; i < n; i += 4) {
      var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
      pix[i  ] = grayscale;   // r
      pix[i+1] = grayscale;   // g
      pix[i+2] = grayscale;   // b
      // alpha
    }
    // 사각 백그라운드 그려주기
    Game.buffer_context.fillStyle = 'rgb(0,0,0)';//rgb
    Game.buffer_context.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);//사각 틀 크기
    Game.context.drawImage(Game.buffer, 0, 0); //이미지 그려줌
    Game.buffer_context.putImageData(imgd, 0, 0);
    Game.context.drawImage(Game.buffer, 0, 0);
  },

  //
  keyEvent : function(e) { //키보드를 눌렀을 때 방향키 점프,재시작 등등
    //console.log(e.keyCode);
    // Space = 32 ArrowUp = 38
    // R = 82  S = 83  I = 73  N = 78 Ű���� �̺�Ʈ
  switch(e.keyCode) {//아스키코드를 활용해서 키보드 사용
 // case(38): !Game.isDrawing ? Game.reset() : Player.jump(); break;
  case(32): Player.jump();if(!Game.isDrawing && !$('input').is(":focus")) Game.reset(); break;//점프 스페이스바
  case(78): if(!Game.isDrawing && !$('input').is(":focus")) Game.stop(); break;//n은 재시작 , 스탑
 // case(82): if(!Game.isDrawing && !$('input').is(":focus")) Game.reset(); break;
 // case(83): if(!Game.isDrawing && !$('input').is(":focus")) Highscore.showForm(); break;
  case(73): if(!Game.isDrawing && !$('input').is(":focus")) Game.showInfo(); break;//게임정보
  }
  }
};
Game.init();
//클로저는 독립적인 (자유) 변수를 가리키는 함수이다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 '기억한다'.
//Game.start();
