//TODO: ADD PLUGIN TO REMOVE UNUSED CSS
//TODO: ADD RETINA SOCIAL ICONS
//TODO: hide social icons on mobile

import $ from 'jquery';

import initMenu from './menu';
import initSlideshow from './slideshow';
import initSchedule from './schedule';
import initWidgets from './widgets';
import initTeachers from './teachers';

const onDomReady = () => {
  initMenu();
  initSchedule();
  initSlideshow();
  initWidgets();
  initTeachers();
};


$(onDomReady);