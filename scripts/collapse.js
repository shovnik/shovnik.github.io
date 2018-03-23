$( document ).ready(function() {
  $('.collapse')
    .map(function(index, element) {
      $(element)
        .parent()
        .on("click", function() {
          const collapse = $(this).children('.collapse');
          const collapsible = $(this).children('.collapsible');
          if ($(collapse).hasClass("active")) {
            $(collapse).removeClass("active");
            $(collapsible).css('display', "none")
          } else {
            $(collapse).addClass("active");
            $(collapsible).css("display", "block")
          }
        })
    });
});
