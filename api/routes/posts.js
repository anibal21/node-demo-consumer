"use strict";
import express from "express";
import Post from "./../models/Post";

var postRouter = express.Router();

postRouter.get("/*", function(req, res, next) {
  Post.find({})
    .then(docs => {
      res.status(200).send(docs);
    })
    .catch(err => res.status(403).send({ error: err }));
});

export { postRouter };
