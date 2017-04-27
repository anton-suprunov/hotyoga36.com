//TODO: ADD PLUGIN TO REMOVE UNUSED CSS
//TODO: ADD RETINA SOCIAL ICONS
//TODO: hide social icons on mobile

import $ from 'jquery';
import responsiveNav from 'responsive-nav';
import slick from 'slick-carousel';

const init = () => {
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

  $('.nav__toggle').on('click', (e) => {
    $('.menu').toggleClass('menu_active menu_inactive');
  });
  $('.menu').addClass('menu_inactive');
  setTimeout(() => { $('.menu').addClass('menu_loaded'); }, 1000);
};

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

$(init);
