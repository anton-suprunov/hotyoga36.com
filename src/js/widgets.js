import $ from 'jquery';

let scriptsLoaded = false;

function initWidgets() {
  testScreen();
  $(window).on('orientationchange resize', testScreen);
}

function testScreen() {
  if ($(window).outerWidth() >= 1200 && !scriptsLoaded) {
    scriptsLoaded = true;
    //initFB(); // fb loaded asynchronyously by itself
    initInstagram();
    initVK();
  }
}

function initFB() {
  return $.getScript( "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=280467664480", function( data, textStatus, jqxhr ) {
    console.log( data, textStatus, jqxhr.status ); // Data returned
    console.log( "fb loaded" );
  });
}

function initVK() {
  return $.getScript( "//vk.com/js/api/openapi.js?144", function( data, textStatus, jqxhr ) {
    console.log( data, textStatus, jqxhr.status ); // Data returned
    console.log( "vk loaded" );
    VK.Widgets.Group("vk_groups", {mode: 4, height: "270", width: "auto"}, 124085376);
  });
}

function initInstagram() {
  $('#instagram-widget').attr('src', 'https://snapwidget.com/embed/370023');
}

export default initWidgets;