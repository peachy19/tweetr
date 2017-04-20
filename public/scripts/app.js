/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function(){

const MAX_LENGTH = 140;
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


function createTweetElement(tweet){

    const {user, content, created_at} = tweet;
    const {avatars, name, handle} = tweet.user;

    var $tweet = $('<article>').addClass("tweet");
    var $header = $('<header>');
    $header.append(($("<img>").addClass("avatar")).attr('src',avatars.small));
    $header.append(($("<span>").addClass("fName")).text(name));
    $header.append(($("<span>").addClass("userName")).text(handle));

    var $footer = $("<footer>");
    $footer.append(($("<span>").addClass("daysAgo")).text(created_at));
    var $symbols = ($("<span>").addClass("footerSymbols"));
    $symbols.append($("<span>").addClass("ui-icon ui-icon-heart"));
    $symbols.append($("<span>").addClass("ui-icon ui-icon-refresh"));
        $symbols.append($("<span>").addClass("ui-icon ui-icon-flag"));
    $footer.append($symbols);

    $tweet.append($header);
    $tweet.append($("<p>").text(content.text));
    $tweet.append($footer);


    // var user = tweet.user;
    // var $tweet = $("article.tweet");
    // var $header = $tweet.children("header");
    // $header.children("img").attr('src',user.avatars.small);
    // $header.children(".fName").text(user.name);
    // $header.children(".userName").text(user.handle);

    // $tweet.children("p").text(tweet.content.text);

    // $tweet.children(".daysAgo").text(tweet['created_at'] );
    //       <span class="footerSymbols">${&#x2665}${&#x2691}</span>

    // const $tweet = `

    // <article class="tweet">
    //       <header>
    //         <img class="avatar" src= ${avatars.small}>
    //         <span class="fName">${name}</span>
    //         <span class="userName">${handle}</span>
    //       </header>
    //       <p>${content.text}</p>
    //       <footer>
    //         <span class="daysAgo">${created_at}</span>
    //           <span class="footerSymbols">${&#x2665}${&#x2691}</span>
    //       </footer>
    //     </article>
    // `;


    return($tweet);

  }
// Test / driver code (temporary)

function renderTweets(data){
  data.forEach(function(item){
        let $value = createTweetElement(item);
      console.log($value); // to see what it looks like
  $('#all-tweets').prepend($value);
  })

  }

  // renderTweets(data);


function loadTweets(){
  console.log("LoadTweets is hit")
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(tweetData) {
      $('#all-tweets').empty();
      renderTweets(tweetData);
    }
  })
}
$("form").on('submit', function(event){
  event.preventDefault();
  console.log("This is", $(this));
  console.log("TExtarea", $(this).children("textarea"));
  var length = $(this).children("textarea")[0].textLength;
  console.log("Length is", length);
  if(checkValid(length)){
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function() {
        loadTweets();
      }
    });
  }
  else {
    alert("Tweet input invalid");
  }
});
// to add it to the page so we can make sure it's got all the right elements, classes, etc.

function checkValid(length){
  if(!length){
    return false;
  } else if(length >= 140){
    return false;
  } else{
    return true;
  }
}

loadTweets();
});