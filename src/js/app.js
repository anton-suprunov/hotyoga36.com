//TODO: ADD PLUGIN TO REMOVE UNUSED CSS
//TODO: ADD RETINA SOCIAL ICONS
//TODO: hide social icons on mobile

import $ from 'jquery';
//import responsiveNav from 'responsive-nav';
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

  /*$.get(
    'https://calendar.yandex.ru/export/html.xml?private_token=073e91671b007918376f4e098f782916cf5c32f3&tz_id=Europe/Moscow&limit=30',
  ).then(function() {
      console.log(arguments);
    });*/

  $('.nav__toggle').on('click', (e) => {
    $('.menu').toggleClass('menu_active menu_inactive');
  });
  $('.menu').addClass('menu_inactive');
  setTimeout(() => { $('.menu').addClass('menu_loaded'); }, 1000);

  $('.b-content-event').on('click', (e) => {
    $(e.currentTarget).toggleClass('b-content-event_active');
  });

  if ($(window).outerWidth() > 980 ) {
    renderSchedule();
  }
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

function renderSchedule() {
  var schedule = $('<iframe class="schedule-iframe" src="https://calendar.yandex.ru/week?embed&amp;layer_ids=4383078&amp;tz_id=Europe/Moscow" width="800" height="600" frameborder="0" style="width:100%;"></iframe>');
  schedule.insertBefore('.schedule-mobile');
}

$(init);
