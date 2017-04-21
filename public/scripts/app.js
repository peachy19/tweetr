/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  const MAX_LENGTH = 140;

  function createTweetElement(tweet) {
    const { user, content, created_at } = tweet;
    const { avatars, name, handle } = tweet.user;

    let timestamp = moment(created_at).fromNow();

    if(timestamp === "in a few seconds"){
      timestamp = "a few seconds ago";
    }
    console.log("Time", timestamp);

    // var $tweet = $("<article>").addClass("tweet");
    // var $header = $("<header>");
    // $header.append($("<img>").addClass("avatar").attr("src", avatars.small));
    // $header.append($("<span>").addClass("fName").text(name));
    // $header.append($("<span>").addClass("userName").text(handle));

    // var $footer = $("<footer>");
    // $footer.append($("<span>").addClass("daysAgo").text(created_at));
    // var $symbols = $("<span>").addClass("footerSymbols");
    // $symbols.append($("<span>").addClass("ui-icon ui-icon-heart"));
    // $symbols.append($("<span>").addClass("ui-icon ui-icon-refresh"));
    // $symbols.append($("<span>").addClass("ui-icon ui-icon-flag"));
    // $footer.append($symbols);

    // $tweet.append($header);
    // $tweet.append($("<p>").text(content.text));
    // $tweet.append($footer);

    const $tweet = `

    <article class="tweet">
          <header>
            <img class="avatar" src= ${avatars.small}>
            <span class="fName">${name}</span>
            <span class="userName">${handle}</span>
          </header>
          <p>${content.text}</p>
          <footer>
            <span class="daysAgo">${timestamp}</span>
             <span class="footerSymbols">
              <i class="fa fa-heart"></i>
              <i class="fa fa-retweet"></i>
              <i class="fa fa-flag"></i>
             </span>

          </footer>
        </article>
    `;

    return $tweet;
  }
  // Test / driver code (temporary)

  function renderTweets(data) {
    const tweets = data.map(createTweetElement).reverse();
    $('#all-tweets').append(tweets);
    // data.forEach(function(item) {
    //   let $value = createTweetElement(item);
    //   // console.log($value); // to see what it looks like
    //   $("#all-tweets").prepend($value);
    // });
  }

  // renderTweets(data);

  function loadTweets() {
    console.log("LoadTweets is hit");
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
  // to add it to the page so we can make sure it's got all the right elements, classes, etc.

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
});