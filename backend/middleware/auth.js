const Users = require("../models/Users");

const auth = async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) return res.status(401).send({error: 'Token is not exist'});
  const user = await Users.findOne({token});
  if (!user) return res.status(401).send({error: 'User not found'});

  req.user = user;
  next();
};

module.exports = auth;