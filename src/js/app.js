//TODO: ADD PLUGIN TO REMOVE UNUSED CSS
//TODO: ADD RETINA SOCIAL ICONS
//TODO: hide social icons on mobile

import $ from 'jquery';

import initMenu from './menu';
import initSlideshow from './slideshow';
import initSchedule from './schedule';

const onDomReady = () => {
  initMenu();
  initSchedule();
  initSlideshow();
};

$(onDomReady);
