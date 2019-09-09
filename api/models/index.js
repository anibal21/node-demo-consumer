import { DB_URL } from 'babel-dotenv';
import mongoose from 'mongoose';
import Post from './Post';

class conn {
  static connectToMongo() {
    if (this.db) return Promise.resolve(this.db);
    return mongoose
      .connect(this.url, this.options)
      .then(db => {
        this.db = db;
      })
      .catch(err => {
        console.log('No se pudo conectar');
      });
  }
}

conn.db = null;
conn.url = DB_URL;
conn.options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: 1000,
  autoReconnect: true,
  keepAlive: 30000,
  reconnectInterval: 3000,
};

const models = {
  Post,
};

export { conn };

export default models;
