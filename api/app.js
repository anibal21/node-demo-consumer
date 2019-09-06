import { PORT, SWAGGER_PATH } from "babel-dotenv";
import { URL } from "url";
import axios from "axios";
import { getTime } from "date-fns";
import Post from "./models/Post";

import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import { conn } from "./models/index";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

// Set up the express app
const app = express();

//Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use(function(req, res, next) {
  return res.status(404).send({ error: "Route" + req.url + " Not found." });
});

app.use(function(err, req, res, next) {
  return res.status(500).send({ error: "Error interno del servidor _" + err });
});

function loadPosts() {
  setTimeout(function() {
    const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs";
    axios(url)
      .then(res => {
        const step = getTime(new Date());
        const posts = res.data.hits.map((item, index) => ({
          id: !item.story_id ? step + index : step + item.story_id,
          title: !item.title ? item.story_title : item.title,
          created_at: !item.created_at_i
            ? getTime(new Date())
            : item.created_at_i,
          author: !item.author ? "anonymous" : item.author,
          url: !item.url ? item.story_url : item.url,
          step: step
        }));
        posts.map(item => {
          Post.create(item)
            .then(fund => {})
            .catch(reason => console.log(reason));
        });
      })
      .catch(reason => console.log(reason));
    loadPosts();
  }, 10000);
}

loadPosts();

const PORT_LOCAL = PORT;

app.listen(PORT_LOCAL, "0.0.0.0", () => {
  conn.connectToMongo();
  console.log(`server running on port ${PORT}`);
});
