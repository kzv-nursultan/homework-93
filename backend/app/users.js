const express = require("express");
const Users = require("../models/Users");
const config = require("../config");
const axios = require("axios");
const router = express.Router();


router.get('/', async (req, res) => {
  const users = await Users.find();
  res.send(users);
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newUser = new Users({
      email: data.email,
      password: data.password,
      displayName: data.displayName,
      avatar: data.avatar,
    });
    newUser.generateToken();
    await newUser.save();
    res.send(newUser);
  } catch (e) {
    res.status(400).send(e?.message);
  }
});

router.post('/facebooklogin', async (req, res) => {
  const request = req.body;
  const inputToken = request.accessToken;
    const accessToken = config.facebookAppId + '|' + config.appSecretKey;
    const debugUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
  try {
    const response = await axios.get(debugUrl);

    if (response.data.data.error) return res.status(401).send({error: 'Facebook token is incorrect'});

    if (response.data.data?.user_id !== request.id) {
      return res.status(401).send({message: 'User ID is incorrect'});
    }

    let user = await Users.findOne({facebookID: request.id});

    if (!user) {
      user = new Users({
        email: request.email,
        password: request.password,
        displayName: request.displayName,
        avatar: request.avatar,
      });
    }
    user.generateToken();
    await user.save();
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;