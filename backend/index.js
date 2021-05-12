require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exitHook = require("async-exit-hook");
const config = require("./config");
const users = require("./app/users");
const events = require("./app/events");
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/events', events);

const run = async () => {
  await mongoose.connect(config.db.url, config.db.options);

  app.listen(port, () => {
    console.log(`server started on ${port} port`);
  });

  exitHook(async callback => {
    await mongoose.disconnect();
    console.log('Mongoose was disconnected.');
    callback();
  });
};

run().catch(e => console.error(e));