const express = require("express");
const Users = require("../models/Users");
const config = require("../config");
const axios = require("axios");
const auth = require("../middleware/auth");
const {nanoid} = require("nanoid");
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
      avatar: data.avatarImage,
    });
    newUser.generateToken();
    await newUser.save();
    return res.send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/session', async (req, res) => {
  try {
   const user = await Users.findOne({email: req.body.email});
   if (!user) return res.status(401).send({error: 'User not found!'});

   const isMatch = await user.checkPassword(req.body.password);
   if (!isMatch) return res.status(401).send({error: 'User not found!'});

   user.generateToken();
   await user.save();
   res.send(user);
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
        password: nanoid(),
        displayName: request.name,
        avatar: request.picture.data.url,
        facebookID: request.id,
      });
    }
    user.generateToken();
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/session', async (req, res) => {
  const token = req.get('Authorization');
  const success = 'Success';
  try {
    if (!token) return res.send(success);

    const user = await Users.findOne({token});
    if (!user) return res.send(success);

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    res.send(e);
  }
});

router.post('/subscribe', auth, async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await Users.findOne({token});
    const friend = await Users.findOne({email: req.body.email});

    if (!friend) return res.status(400).send('User not found');
    if (String(user._id) === String(friend._id)) {
      return res.status(400).send('You cant add yourself');
    }
    const isExist = user.subscribers.some(object => String(object.id) === String(friend._id));
    if(isExist) return res.status(400).send('This user is already added');

    user.subscribers.push({id: friend._id});
    friend.subscription.push({id: user._id});

    await user.save();
    await friend.save();
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

router.post('/unsubscribe', auth, async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await Users.findOne({token});
    const friend = await Users.findOne({email: req.body.email});
    for (let i=0; i<user.subscribers.length; i++) {
      if (String(user.subscribers[i].id) === String(friend._id)) {
        user.subscribers.splice(i, 1);
      }
    }
    for (let i=0; i<friend.subscription.length; i++) {
      if (String(friend.subscription[i].id) === String(user._id)) {
        friend.subscription.splice(i, 1);
      }
    }
    await user.save();
    await friend.save();
    console.log(user);
  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = router;