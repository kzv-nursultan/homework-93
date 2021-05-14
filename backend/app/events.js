const express = require("express");
const Events = require("../models/Events");
const auth = require("../middleware/auth");
const Users = require("../models/Users");
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    const newEvent = new Events({
      author: data.author,
      eventName: data.eventName,
      date: data.date,
      duration: data.duration,
    });
    await newEvent.save();
    res.send(newEvent);
  } catch (e) {
    res.status(400).send(e?.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Events.findByIdAndDelete(req.params.id);
    res.send('success');
  } catch (e) {
    res.status(400).send(e?.message);
  }
});

router.get('/' , auth, async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await Users.findOne({token});
    let events = await Events.find({author: user._id});
    if (user.subscription.length > 0) {
      await Promise.all(
        user.subscription.map(async object => {
          const friendsEvent = await Events.find({author: object.id});
          events = events.concat(friendsEvent);
        })
      )
      res.send(events);
    } else {
      res.send(events);
    }
  } catch (e) {
    res.status(401).send(e);
  }
});

module.exports = router;
