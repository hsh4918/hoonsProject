var SliderDiv = function(_options) { // 초기 메뉴에서 좌우키를 입력받아 화면을 넘기게 하는 함수.
   var defaults = {
    containerSelector: '#slide-container',
    slideWrapperSelector: '.slide-wrapper',
    slideSelector: '.slide',
    nextButtonSelector: '.nextButton',
    previousButtonSelector: '.prevButton', //지정
    hasKeyEvents: true,
    moveSpeed: 500 //기본 이속
  }
  this.settings = $.extend({}, defaults, _options); //3개 지정

  this.container = $(this.settings.containerSelector);
  this.viewport = this.container.find(this.settings.slideWrapperSelector);
  this.slideObj = this.viewport.find(this.settings.slideSelector);
  this.nextButton = this.container.find(this.settings.nextButtonSelector);
  this.prevButton = this.container.find(this.settings.previousButtonSelector);

  this.currentSlide = null,
  this.MOVE_SPEED = 1000;
  this.HAS_KEY_EVENTS = true;

  this.init();
};

SliderDiv.prototype.init = function() {
    this.currentSlide = 0;
    this.handleButtonVisibility();

    // Adapt size
    var vp = this.container.width() * this.slideObj.length;
    this.viewport.css({ width:  vp + 'px', overflow: 'overlay', clear: 'both'});
    this.slideObj.css({ width: this.container.width() + 'px' });

    // Event
    this.nextButton.click($.proxy(this.next, this)); //다음 버튼
    this.prevButton.click($.proxy(this.prev, this)); // 이전 버튼
    $(document).keydown($.proxy(this.keyEvent, this));

    this.countSlides = this.slideObj.length;
};

SliderDiv.prototype.next = function(e) {
  if(this.currentSlide == this.slideObj.length - 1) return false;
  this.currentSlide++;
  this.move(1); // 다음 장으로 넘어가지는거
};

SliderDiv.prototype.prev = function(e) {
  if(this.currentSlide == 0) return false;
  this.currentSlide--;
  this.move(-1); //이전 장으로 넘어가지는거
};

SliderDiv.prototype.move = function(_direction, _distance) {
  this.handleButtonVisibility();

  // Move
  var distance = _distance ? _distance : this.container.width();
  var to = _direction < 0 ? '+=' : '-=';

  // Animation
  this.viewport.animate({//그냥 화면이 바뀌는게 아니라 지나가는게 보이는것처럼
    left: to + distance
  }, this.MOVE_SPEED, function() {

  });
};

SliderDiv.prototype.moveTo = function(_index) {
  if($("input, textarea").is(":focus")) return false;
  if(_index < 0 || _index == this.currentSlide || _index > this.countSlides) return false;

  // Direction
  var currentLeft = this.slideObj.eq(this.currentSlide).offset().left;
  var nextLeft = this.slideObj.eq(_index).offset().left;
  var direction = currentLeft > nextLeft ? -1 : 1;

  // Distance
  var distance = this.container.width() * Math.abs(this.currentSlide - _index);

  // I like to move it move it
  this.currentSlide = _index;
  this.move(direction, distance);
};

SliderDiv.prototype.handleButtonVisibility = function() {
  this.nextButton.show();//버튼 시각화
  this.prevButton.show()
  if(this.currentSlide == this.slideObj.length - 1)
    this.nextButton.hide(); //끝까지가면 다음버튼은 안보임
  if(this.currentSlide == 0)
    this.prevButton.hide()// 마찬가지
};

SliderDiv.prototype.getViewportHeight = function(_index) {
  var hiddenFields = this.slideObj.eq(_index).find(':hidden').show();
  var newH = this.slideObj.eq(_index).height();
  hiddenFields.hide()
  return newH;
};

SliderDiv.prototype.keyEvent = function(e) {//마우스클릭 말고도 키보드로도 입력받을수 있도록
  if(!this.HAS_KEY_EVENTS) return false;
  switch(e.keyCode) {
    case(39): this.next();break;
    case(37): this.prev();break; //왼쪽 오른쪽에 키를 입력받을 수 있음

  }
};
