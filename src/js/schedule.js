import $ from 'jquery';

const monthsMap = {
    '0' : 'января',
    '1' : 'февраля',
    '2' : 'марта',
    '3' : 'апреля',
    '4' : 'мая' ,
    '5' : 'июня',
    '6' : 'июля',
    '7' : 'августа',
    '8' : 'сентября',
    '9' : 'октября',
    '10' : 'ноября',
    '11' : 'декабря'
  },
  daysOfWeek = {
    '0' : 'Воскресенье',
    '1' : 'Понедельник',
    '2' : 'Вторник',
    '3' : 'Среда',
    '4' : 'Четверг',
    '5' : 'Пятница',
    '6' : 'Суббота'
  };

function initSchedule() {
  if (!$('.schedule-mobile').length) {
    return;
  }

  renderSchedule();
  //$(window).resize(renderSchedule);
  $(window).on('orientationchange resize', renderSchedule);

  loadMobile()
    .then(function(data) {

      $('.schedule-mobile').html(data);

      $('.e-time span:first-child').each((index, el) => {
        //console.log($(el).text(), dateIterator(index, el) );
        $(el).parent().html( dateIterator(index, el) );
      });

      $('.b-content-event').on('click', (e) => {
        $(e.currentTarget).toggleClass('b-content-event_active');
      });
    });
}

function dateIterator(index, el) {
  let date = $(el).html(),
    dateParts = [],
    engDateParts = [],
    engDate,
    dayOfWeek,
    eventDate;

  for (let month in monthsMap) {
    if (monthsMap.hasOwnProperty(month)) {
      const rgx = new RegExp(monthsMap[month], 'g');

      date = date.replace(/&nbsp;/g, ' ');

      if (date.match(rgx)) {
        engDate = date.replace(rgx, capitalizeFirstLetter(month));
      }
    }
  }

  engDateParts = engDate.split(' ');
  dateParts = date.split(' ');

  eventDate = new Date(engDateParts[2], engDateParts[1], engDateParts[0]);
  dayOfWeek = daysOfWeek[eventDate.getDay()];
  //console.log(engDateParts, dateParts);

  return dayOfWeek + ', ' + dateParts[3] + '<br>' + dateParts[0] + ' ' + dateParts[1];
}

function loadMobile() {
  return $.get('/schedule-yandex.html');
}

function renderSchedule() {
  if ($('.schedule-iframe').length) {
    return;
  }
  console.log($(window).outerWidth());
  var schedule = $('<iframe class="schedule-iframe" src="https://calendar.yandex.ru/week?embed&amp;layer_ids=4383078&amp;tz_id=Europe/Moscow" width="800" height="600" frameborder="0" style="width:100%;"></iframe>');
  if ($(window).outerWidth() > 980 ) {
    schedule.insertBefore('.schedule-mobile');
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default initSchedule;