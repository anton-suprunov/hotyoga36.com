import $ from 'jquery';
import responsiveNav from 'responsive-nav';
import slick from 'slick-carousel';

const init = () => {
  //const nav = responsiveNav(".nav", {});
  
  $('.slideshow').slick({
    prevArrow : null,
    nextArrow : null,
    autoplay : true,
    fade : true,
    dots : true
  });
};

$(init);
