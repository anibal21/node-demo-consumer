import { PORT, HN_URL } from 'babel-dotenv';
import axios from 'axios';
import { getTime } from 'date-fns';
import Post from './models/Post';
import cors from 'cors';

import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import { conn } from './models/index';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

// Set up the express app
const app = express();

//Cors
app.use(cors());

//Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use(function(req, res, next) {
  return res.status(404).send({ error: 'Route' + req.url + ' Not found.' });
});

app.use(function(err, req, res, next) {
  return res.status(500).send({ error: 'Error interno del servidor _' + err });
});

function loadPosts() {
  setTimeout(function() {
    axios(HN_URL)
      .then(res => {
        const step = getTime(new Date());
        try {
          Post.find({}, { objectID: true, _id: false }).exec((err, docs) => {
            if (err) console.log(e);
            else {
              const ids = docs.map(item => item.objectID);
              const posts = res.data.hits
                .filter(
                  (item, index) =>
                    !ids.includes(parseInt(item.objectID)) &&
                    (item.url != null || item.story_url != null)
                )
                .map((item, index) => ({
                  objectID: !item.objectID ? '' + step + index : item.objectID,
                  title: !item.title ? item.story_title : item.title,
                  deleted: false,
                  created_at: !item.created_at_i
                    ? getTime(new Date())
                    : item.created_at_i,
                  author: !item.author ? 'anonymous' : item.author,
                  url: !item.url ? item.story_url : item.url,
                  step: step,
                }));

              Post.insertMany(posts);
            }
          });
        } catch (e) {
          console.log(e);
        }
      })
      .catch(reason => console.log(reason));
    loadPosts();
  }, 3600000);
}

loadPosts();

const PORT_LOCAL = PORT;

app.listen(PORT_LOCAL, '0.0.0.0', () => {
  conn.connectToMongo();
  console.log(`server running on port ${PORT}`);
});
