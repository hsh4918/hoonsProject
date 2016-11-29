jump : function(isFire) { //점프아이템
    var isFire = isFire || false;
    if(Player.isJumping || Player.isFalling && !isFire) return false;

    // Set default values
    Player.velocityMax = Player.initVelocityMax;//최대속도와 초기화한 최대속도가 같음
    Player.maxJumpHeight = Player.initMaxJumpHeight;//점프높이와 초기화한 점프높이가 같음

    if(isFire) {
      Player.velocityMax = 6; //속도 6
      Player.maxJumpHeight = 130;//점프높이 130
    }

    Player.isJumping = true; //점프를 함
    Player.lastY = Player.shape.y;
    Player.reachedPeak = false;
  },

  checkJump : function() { //점프함수
    // Player jumps
    if(Player.isJumping && !Player.reachedPeak) {

      Player.velocity -= 12.5 * (Player.maxJumpHeight - (Player.shape.y - Player.lastY)) / 100;

      if(Player.shape.y <= Player.lastY - Player.maxJumpHeight) {
        Player.reachedPeak = true;
        Player.isJumping = false;
        Player.isFalling = true;
      }
    }
    // Player falls
    else {
      if(Player.shape.y + Player.shape.width < Player.groundY && Player.isFalling)//플레이어y축과 가로길이를 더한게 그라운드y와 떨어지는것보다 작으면
        Player.velocity += Player.velocityDownfallSpeed;//플레이어의 떨어지는 속도를 속도에 더함
      else
        Player.isFalling = false;//떨어짐
    }

    if (Player.velocity < -Player.velocityMax) //떨어지는속도가 6이상이면 죽음.
      Player.velocity = -Player.velocityMax;
    else if (Player.velocity > Player.velocityMax)//초기속도가 더 빠름
      Player.velocity = Player.velocityMax;//최대속도와 초기속도가 같음

    if(Player.isFalling || Player.isJumping)//점프나 떨어지는거 둘중 하나라도 true면
      Player.shape.y += Player.velocity;//플레이어에 속도를 더함
  },
};
