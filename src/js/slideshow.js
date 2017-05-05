import $ from 'jquery';
import slick from 'slick-carousel';

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  var player = new YT.Player('youtube-player', {
    events: {
      "onStateChange": onPlayerStateChange
    }
  });
};

function onPlayerStateChange(event) {
  if (event.data === 0 || event.data === 2) {
    // ended or paused
    $('.slideshow').slick('slickPlay');
  } else if (event.data === 1) {
    // started
    $('.slideshow').slick('slickPause');
  }
}

export default function initSlideshow() {
  const headerHeight = $('.header').outerHeight(),
    footerHeight = $('.footer').outerHeight(),
    windowHeight = $(window).outerHeight(),
  //slideshowHeight = windowHeight - headerHeight - footerHeight;
    slideshowHeight = windowHeight - headerHeight;

  $('.slideshow__slide').height(slideshowHeight);

  $('.slideshow').slick({
    prevArrow : null,
    nextArrow : null,
    autoplay : true,
    fade : true,
    dots : true
  });
}