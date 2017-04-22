"use strict";
const ObjectId = require("mongodb").ObjectId;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, results) => {
        if(err) {
          throw err;
        } else {
            callback(null, results);
        }
      });
    },

    saveLikes: function(id, likes, callback) {

      //console.log("Id passed is", db.collection("tweets").find({ "_id" : id}));
      db.collection("tweets").update(
        { "_id" : ObjectId(id)},
      {
        $set: { "likes": likes}
      }, callback);
    },

    getLikes: function(id, callback) {
      db.collection("tweets").findOne({ "_id" : ObjectId(id)},(err, tweets) => {
      if(err) {
          throw err;
        } else {
          console.log("tweet is", tweets);
          callback(null, tweets.likes);
        }
      });
    }
  }

}
