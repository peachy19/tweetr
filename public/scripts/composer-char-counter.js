
$(function(){
  console.log("document is ready");
  const MAX_LENGTH = 140;

  $(".new-tweet textarea").on('keyup', function() {
    const length = this.value.length;
    const $counter = $(this).parent().children(".counter");

    $counter.text(MAX_LENGTH - length);
    if(length > MAX_LENGTH) {
      $counter.addClass('invalid');
    } else {
      $counter.removeClass('invalid');
    }
  });
});

