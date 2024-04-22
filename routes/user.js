// routes/user.js

const express = require('express');
const router = express.Router();

const { handleUserSignup, handleUserLogin } = require('../controllers/user');

// Define your routes with proper callback functions
router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);

module.exports = router;
