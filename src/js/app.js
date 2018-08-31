//TODO: ADD PLUGIN TO REMOVE UNUSED CSS
//TODO: ADD RETINA SOCIAL ICONS
//TODO: hide social icons on mobile

import $ from 'jquery';

import initMenu from './menu';
import initSlideshow from './slideshow';
import initSchedule from './schedule';
import initWidgets from './widgets';
import initTeachers from './teachers';

//import lightgallery from 'lightgallery/dist/lightgallery';
import "lightgallery.js";
//import "lg-zoom.js";

const initGallery = () => {
  if ($('#gallery').length) {
    lightGallery($('#gallery').get(0), {
      download: false
    }); 
  }
}

const onDomReady = () => {
  initMenu();
  initSchedule();
  initSlideshow();
  initWidgets();
  initTeachers();
  initGallery();
};


$(onDomReady);