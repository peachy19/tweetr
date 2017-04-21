const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

module.exports = function(callback){
  MongoClient.connect(MONGODB_URI, (err, db) => {
      console.log("Database", db);
      callback(db);
  });

}



