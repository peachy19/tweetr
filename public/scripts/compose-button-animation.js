$(function(){
  $(".compose").on('click', function() {
// $(".new-tweet").show();
    $(".new-tweet").slideToggle(function(){
      console.log($(".new-tweet"));
      $(".new-tweet textarea").focus();
    });

  });
});