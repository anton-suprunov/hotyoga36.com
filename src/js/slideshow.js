import $ from 'jquery';
import slick from 'slick-carousel';

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  var player = new YT.Player('youtube-player', {
    events: {
      "onStateChange": onPlayerStateChange
    }
  });
};

const defaultConfig = {
  prevArrow : null,
  nextArrow : null,
  autoplay : true,
  fade : true,
  dots : true
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

function initSlideshow() {
  const headerHeight = $('.header').outerHeight(),
    footerHeight = $('.footer').outerHeight(),
    windowHeight = $(window).outerHeight(),
  //slideshowHeight = windowHeight - headerHeight - footerHeight;
    slideshowHeight = windowHeight - headerHeight;

  if (!$('.slideshow').length) {
    return;
  }

  $('.slideshow').each((index, slideshow) => {
    slideshow = $(slideshow);
    let config = Object.assign({}, defaultConfig);
    //console.log(slideshow.data(), slideshow.data('has-video'));
    if (slideshow.data('hasVideo')) {
      $.getScript("//www.youtube.com/iframe_api");    
    }
    if (slideshow.data('dynamicHeight')) {
      $('.slideshow__slide').height(slideshowHeight);    
    }
    if (slideshow.data('arrows')) {
      config.arrows = true;
      delete config.prevArrow;
      delete config.nextArrow;
    }
    
    console.log(config);
    slideshow.slick(config);
  });
}

export default initSlideshow;