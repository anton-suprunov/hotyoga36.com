import $ from 'jquery';

export default function initTeachers() {
  $('.teachers__teacher').on('click', (e) => {
    e.preventDefault();
    $('.popup__content').html($(e.currentTarget).html());
    $('.popup').addClass('popup_active');
  });
  $('.popup').on('click', (e) => {
    $('.popup').removeClass('popup_active');
  });
  
};