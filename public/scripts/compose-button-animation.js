$(function(){
  $(".compose").on('click', function(e) {
// $(".new-tweet").show();
    e.preventDefault();
    $(".new-tweet").slideToggle(function(){
      // console.log($(".new-tweet"));
      $(".new-tweet textarea").focus();
    });

  });
});