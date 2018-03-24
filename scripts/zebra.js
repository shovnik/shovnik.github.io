$( document ).ready(function() {
  $('td:odd')
    .css('background-color', "#FDD");
  $('tr:odd td:even')
    .css('background-color', "#DDD");
  $('tr:odd td:odd')
    .css('background-color', "#DBB");
});
