var Player = {

  x: 100,  // 플레이어 x 축 위치
  y: 0,     // 플레이어 y 축 위치
  width: 46, // 캐릭터 충돌박스(가로)
  height: 46, // 캐릭터 충돌박스(세로)
  shape: null,
  isVisible: true,
  // Jump ������
  isJumping: false,
  isFalling: true,
  lastY: 0, //마지막 Y축은 0
  groundY:50,
  maxJumpHeight: 80,//최대점프높이
  velocity: 0,//속도 : 0
  reachedPeak: false,
  initVelocityMax: 6, //초기속도 6
  initMaxJumpHeight: 85, //초기 점프최대높이
  velocityDownfallSpeed: 9,//떨어지는속도 9
  velocityMax: 0,//최대속도 : 0

  init : function() { //초기내용을 설정
    Player.lastY = this.y; //
    Player.y = Game.HEIGHT - Player.height - 60;
    Player.groundY = Game.HEIGHT;
    Player.jumpSinWaveSpeed = Player.halfPI / Player.jumpHangTime;
    Player.velocityMax = Player.initVelocityMax;
    Player.maxJumpHeight = Player.initMaxJumpHeight;

    Player.shape = new ImageSprite({ //플레이어 이미지를 넣음
      x: Player.x, y: Player.y,
      width: Player.width, height: Player.height,
      context: Game.buffer_context,
      src: 'assets/dino1.png',//캐릭터 이미지
      frames: 4 //캐릭터 모션 속도.
    });
  },

  draw : function() { //그리는 함수
    if(Player.isVisible)
      Player.shape.draw(); //플레이어를 그림
  },

  setPosition : function(_x, _y) { //카메라 위치 함수
    Player.shape.x = _x;  //플레이어 x축
    Player.shape.y = _y;  //플레이어 y축
  },

  reset : function() { //리셋함수 초기상태도 되돌림
    Player.setPosition(100, Game.HEIGHT - Player.height - 60);//
    Player.isVisible = true;
  },
