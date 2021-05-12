require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const exitHook = require("async-exit-hook");
const app = express();
const config = require("./config");

app.use(cors);

const port = 8000;

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