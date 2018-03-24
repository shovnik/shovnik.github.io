$( document ).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop()) {
      $('#navBar').css('opacity', "0.8");
    } else {
      $('#navBar').css('opacity', "1");
    }
  })
});
