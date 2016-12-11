
var endingSound;
var jumpSound;
var backbgmSound;


    // 'Dragon' music init
    endingSound = new Audio('sounds/ending1.mp3');
    endingSound.volume = 0.9;

    // 'Wings' music init
    jumpSound = new Audio('sounds/finger1.mp3');
    jumpSound.volume = 1;

	backbgmSound = new Audio('sounds/backbgm.mp3');
	backbgmSound.volume = 1;

	var endingSoundNow = function(){
		endingSound.play();
	if(endingSound.currentTime > 0) // INVALID_STATE_ERR�� ���ϱ� ���� �ļ�
		endingSound.currentTime = 0;
}
	var backbgmSoundNow = function(){
		backbgmSound.play();
	if(backbgmSound.currentTime > 0) // INVALID_STATE_ERR�� ���ϱ� ���� �ļ�
		backbgmSound.currentTime = 0;
}

 
