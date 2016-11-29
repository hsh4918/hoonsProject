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
