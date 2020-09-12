const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt'); // password hash

//DB

// login Router
router.post('/login', async (req,res,next) => {
	
});

// Join Router
router.post('/join');

// KAKAO OAuth
router.get('/kakao');
router.get('/kakao/callback');

// FB OAuth
router.get('/facebook');
router.get('/facebook/callback');

//Google OAuth
router.get('/google');
router.get('/google/callback');

exports.default = router;