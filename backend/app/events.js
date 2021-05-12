const express = require("express");
const Events = require("../models/Events");
const auth = require("../middleware/auth");
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
    res.send({message: 'Success'});
  } catch (e) {
    res.status(400).send(e?.message);
  }
});

router.post('/:id', auth, async (req, res) => {
  try {
    const data = await Events.findById(req.params.id);
    res.send(data);
  } catch (e) {
    res.status(400).send(e?.message);
  }
})

module.exports = router;