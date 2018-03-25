$( document ).ready(function() {
  $('tr:even td:odd')
    .addClass("oddEven")
  $('tr:odd td:even')
    .addClass("evenOdd")
  $('tr:odd td:odd')
    .addClass("evenEven")
});
