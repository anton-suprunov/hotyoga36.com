import $ from 'jquery';

export default function initTeachers() {
  $('.teachers__teacher').on('click', (e) => {
    const href = $(e.currentTarget).attr('href');
    //console.log(href, $(this));
    if (href && href.length && href !== '#') return;

    e.preventDefault();
    $('.popup__content').html($(e.currentTarget).html());
    $('.popup').addClass('popup_active');
  });
  $('.popup').on('click', (e) => {
    $('.popup').removeClass('popup_active');
  });
  
  $('.teachers__text_short').on('click', function() {
    $(this).next('.teachers__text_long').addClass('teachers__text_visible');
    $(this).addClass('teachers__text_hide')
  });

  $('.teachers__text_long').on('click', function () {
    $(this).prev('.teachers__text_short').removeClass('teachers__text_hide');
    $(this).removeClass('teachers__text_visible')
  })
};