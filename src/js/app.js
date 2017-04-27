//TODO: ADD PLUGIN TO REMOVE UNUSED CSS
//TODO: ADD RETINA SOCIAL ICONS
//TODO: hide social icons on mobile
//TODO: Only include social widgets for desktop

import $ from 'jquery';
import responsiveNav from 'responsive-nav';
import slick from 'slick-carousel';

const init = () => {
  //const nav = responsiveNav(".nav", {});
  
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
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var slide = $('.slideshow__slide').eq(currentSlide),
      hasVideo = slide.find('iframe').length > 0;

    console.log(hasVideo);
    if (hasVideo) {
      console.log('replace video and restart slick');
      setTimeout(function() {
        replaceVideo(slide);
        $('.slideshow').slick('slickPlay');
      }, 1000);
    }

  }).on('afterChange', function(e, slick, currentSlide) {
    var slide = $('.slideshow__slide').eq(currentSlide),
        hasVideo = slide.find('iframe').length > 0;

      if (hasVideo) {
        console.log('pause slick');
        $('.slideshow').slick('slickPause');
      }
  });

  $('.nav__toggle').on('click', (e) => {
    $('.menu').toggleClass('menu_active menu_inactive');
  });
  $('.menu').addClass('menu_inactive');
  setTimeout(() => { $('.menu').addClass('menu_loaded'); }, 1000);

  function replaceVideo(slide) {
    var frame = slide.find('iframe'),
        newFrame = frame.clone();

    frame.replaceWith(newFrame);
  }
};

/*
window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  var player = new YT.Player('youtube-video', {
    width : '100%',
    height : '100%',
    videoId : 'kR5VOwzVo0',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    //setTimeout(stopVideo, 6000);
    //done = true;
  }
  switch(event.data) {
    case 0:
      console.log('video ended');
      break;
    case 1:
      console.log('video playing from '+player.getCurrentTime());
      break;
    case 2:
      console.log('video paused at '+player.getCurrentTime());
  }
}
*/

$(init);
