const uuid = require('uuid');
const user = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await user.create({ name, email, password });
  return res.redirect("/"); 
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await user.findOne({ email, password });

  if (!user) {
    return res.render("login", {
      error: "Invalid username or password"
    });
  }

  const token = setUser(user._id, user);
  res.cookie("token",token);
  return res.redirect("/");    
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};
