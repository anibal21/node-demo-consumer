"use strict";
import { HN_URL } from "babel-dotenv";
import axios from "axios";
import { getTime } from "date-fns";
import express from "express";
import Post from "./../models/Post";

var postRouter = express.Router();

postRouter.get("/", function(req, res, next) {
  Post.find({ deleted: false }, null, { sort: { created_at: "desc" } })
    .then(docs => {
      res.status(200).send(docs);
    })
    .catch(err => res.status(403).send({ error: err }));
});

postRouter.post("/refresh", function(req, res, next) {
  axios(HN_URL)
    .then(resItems => {
      const step = getTime(new Date());
      try {
        Post.find({}, { objectID: true, _id: false }).exec((err, docs) => {
          if (err) console.log(e);
          else {
            const ids = docs.map(item => item.objectID);
            const posts = resItems.data.hits
              .filter((item, index) => !ids.includes(parseInt(item.objectID)))
              .map((item, index) => ({
                objectID: !item.objectID ? "" + step + index : item.objectID,
                title: !item.title ? item.story_title : item.title,
                deleted: false,
                created_at: !item.created_at_i
                  ? getTime(new Date())
                  : item.created_at_i,
                author: !item.author ? "anonymous" : item.author,
                url: !item.url ? item.story_url : item.url,
                step: step
              }));

            Post.insertMany(posts);
            res.status(200).send();
          }
        });
      } catch (e) {
        res.status(403).send({ error: e });
      }
    })
    .catch(reason => res.status(403).send({ error: err }));
});

postRouter.delete("/:id", function(req, res, next) {
  !req.params.id
    ? res.status(403).send({ error: "No hay parametros" })
    : Post.updateOne(
        { objectID: String(req.params.id) },
        { $set: { deleted: true } }
      )
        .then(docs =>
          docs.nModified > 0
            ? res.status(200).send()
            : res.status(403).send({ error: err })
        )
        .catch(err => res.status(403).send({ error: "Error al modificar" }));
});

export { postRouter };
