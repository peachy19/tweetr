//console.log("JS file added");
var length = 0;
$(document).ready(function(){
  console.log("document is ready");

$(".new-tweet").find("textarea").on('keyup', function(){
    length = $(this).val().length;
    $(this).parent().children(".counter").text(140 - length);
    if(length > 140){
      $(this).parent().children(".counter").addClass('invalid');
    } else {
      $(this).parent().children(".counter").removeClass('invalid');
    }
});




});

