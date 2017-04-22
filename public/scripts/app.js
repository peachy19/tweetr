/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  const MAX_LENGTH = 140;


  function createTweetElement(tweet) {
    const { user, content, created_at,likes } = tweet;
    const { avatars, name, handle } = tweet.user;

    let timestamp = moment(created_at).fromNow();

    if(timestamp === "in a few seconds"){
      timestamp = "a few seconds ago";
    }

    var $tweet = $("<article>").addClass("tweet");
    var $header = $("<header>");
    $header.append($("<img>").addClass("avatar").attr("src", avatars.small));
    $header.append($("<span>").addClass("fName").text(name));
    $header.append($("<span>").addClass("userName").text(handle));

    var $footer = $("<footer>");
    $footer.append($("<span>").addClass("daysAgo").text(timestamp));
    //if(likes){
          $footer.append($("<span>").addClass("likesCounter"));

    //}
    var $symbols = $("<span>").addClass("footerSymbols");
    $symbols.append($("<i>").addClass("fa fa-heart").data("id",tweet._id));
    //$("i.fa.fa-heart")
    $symbols.append($("<i>").addClass("fa fa-retweet"));
    $symbols.append($("<i>").addClass("fa fa-flag"));
    $footer.append($symbols);

    $tweet.append($header);
    $tweet.append($("<p>").text(content.text));
    $tweet.append($footer);

    // const $tweet = `

    // <article class="tweet">
    //       <header>
    //         <img class="avatar" src= ${avatars.small}>
    //         <span class="fName">${name}</span>
    //         <span class="userName">${handle}</span>
    //       </header>
    //       <p>${content.text}</p>
    //       <footer>
    //         <span class="daysAgo">${timestamp}</span>
    //          <span class="footerSymbols">
    //           <i class="fa fa-heart"></i>
    //           <i class="fa fa-retweet"></i>
    //           <i class="fa fa-flag"></i>
    //          </span>

    //       </footer>
    //     </article>
    // `;

    return $tweet;
  }

 // Gets every tweet element and appends it to the main container
  function renderTweets(data) {
    const tweet = data.map(createTweetElement).reverse();
    $('#all-tweets').append(tweet);


  }

//Makes AJAX call to get all tweets from the server/database and passes it to renderTweets()
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(tweetData) {
        $("#all-tweets").empty();
        renderTweets(tweetData);
      }
    });
  }
  $("form").on("submit", function(event) {
    $textarea = $(this).children("textarea")[0];
    event.preventDefault();
    var length = $textarea.textLength;
    if (checkValid(length)) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function() {
          $textarea.value = "";
          loadTweets();
        }
      });
    } else {
      alert("Tweet input invalid");
    }
  });



  function checkValid(length) {
    if (!length) {
      return false;
    }
    if (length >= 140) {
      return false;
    }
    return true;
  }

  loadTweets();

  function loadLikes($heart, id){
    $.ajax({
      url: "/likes/"+id,
      method: "GET",
      success: function(likes) {
      $heart.closest("footer").find(".likesCounter").show();
       $heart.closest("footer").find(".likesCounter").text(`${likes} like`);
       if(likes == 0){$heart.closest("footer").find(".likesCounter").hide()}
        console.log("Likes are", likes);
    }
    });
  }


 $("#all-tweets").on("click", "i.fa.fa-heart", function(e){
    let likes = 0;
    console.log($(this).data("id"));
    $(this).toggleClass("like");
        // $handler = $(this).closest("article").find("header .userName").text()
    if($(this).hasClass("like")){
         // $(".like").data("data-handler", $hanlder);
      $(this).data("data-likes", ++likes);
    } else {
      $(this).data("data-likes", likes--);
    }

    console.log($(this).data("data-id"));
        console.log("Heart",$(this),$(this).data("data-likes") );
    $.ajax({

        url: "/likes/"+$(this).data("id"),
        method: "POST",
        data: {"likes": $(this).data("data-likes")},
        success: () => {
          //if(!likes) {
            //$(this).closest("footer").find(".likesCounter").toggle().text(`${likes} likes.`);
          //}
          //$(this).closest("footer").find(".likesCounter").text(`${likes} likes.`);

         //console.log($(this));
         loadLikes($(this), $(this).data("id"));
         console.log("Success!");
        }
      });
});

});