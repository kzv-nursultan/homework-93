const mongoose = require("mongoose");
const config = require("./config");
const Users = require("./models/Users");
const Events = require("./models/Events");
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.db.url, config.db.options);

  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, user1, user2] = await Users.create({
    email: 'user@gmail.com',
    password: 'user',
    displayName: 'user',
    token: nanoid(),
  }, {
    email: 'user001@gmail.com',
    password: 'user001',
    displayName: 'user1',
    token: nanoid(),
  }, {
    email: 'user002@gmail.com',
    password: 'user002',
    displayName: 'user2',
    token: nanoid(),
  });

  await Events.create({
    eventName: 'Lesson',
    author: user,
    date: '22-05-2021',
    duration: '2:00'
  }, {
    eventName: 'New event',
    author: user,
    date: '22-05-2021',
    duration: '3:00'
  }, {
    eventName: 'Some event',
    author: user2,
    date: '22-05-2021',
    duration: '2:00',
  }, {
    eventName: 'New event',
    author: user1,
    date: '22-06-2021',
    duration: '3:00',
  })

  await mongoose.connection.close();
};

run().catch(e=>console.error(e));