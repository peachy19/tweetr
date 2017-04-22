"use strict";

const express       = require('express');
const likesRoutes  = express.Router();

module.exports = function(DataHelpers) {

  likesRoutes.get("/:id", function(req, res) {
    DataHelpers.getLikes(req.params.id, (err, likes) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log("Likes are", likes);
        res.json(likes);
      }
    });
  });

  likesRoutes.post("/:id", function(req, res) {
    // if (!req.params.id) {
    //   res.status(400).json({ error: 'invalid request: no data in POST body'});
    //   return;
    // }
    DataHelpers.saveLikes(req.params.id,req.body.likes, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return likesRoutes;

}
