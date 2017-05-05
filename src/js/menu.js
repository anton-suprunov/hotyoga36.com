import $ from 'jquery';

export default function initMenu() {
  $('.nav__toggle').on('click', (e) => {
    $('.menu').toggleClass('menu_active menu_inactive');
  });
  $('.menu').addClass('menu_inactive');
  setTimeout(() => { $('.menu').addClass('menu_loaded'); }, 1000);
};