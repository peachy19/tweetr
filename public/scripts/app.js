$(function() {
  const MAX_LENGTH = 140;

  // Creates a new tweet element for every tweet data from the database
  function createTweetElement(tweet) {

    const { user, content, createdAt, likes } = tweet;
    const { avatars, name, handle } = tweet.user;

    //Converts the epoch time to user-friendly time format telling when the tweet was created from now.
    let timestamp = moment(createdAt).fromNow();

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
    $footer.append($("<span>").addClass("likesCounter"));
    var $symbols = $("<span>").addClass("footerSymbols");
    $symbols.append($("<i>").addClass("fa fa-heart").data("id", tweet._id));
    $symbols.append($("<i>").addClass("fa fa-retweet"));
    $symbols.append($("<i>").addClass("fa fa-flag"));
    $footer.append($symbols);

    $tweet.append($header);
    $tweet.append($("<p>").text(content.text));
    $tweet.append($footer);

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

  // Checks for input validity and returns correponding error message
  function inputValid(length) {
    if (!length) {
      return "Tweet cannot be empty";
    }
    if (length >= 140) {
      return "Tweet cannot exceed max limit";
    }
  }

  //Makes an AJAX call to submit the new tweet data created by the user.
  $("form").on("submit", function(event) {
    $textarea = $(this).children("textarea")[0];
    event.preventDefault();
    var length = $textarea.textLength;
    if (!inputValid(length)) {
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
      $(".errorMessage").text(inputValid(length));
    }
  });

  // Removes the error message when the user tries to type again in the textarea
  $(".new-tweet textarea").focus(() => { $(".errorMessage").text(""); });

  loadTweets();

});