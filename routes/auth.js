const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt'); // password hash
const models = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const logger = require('../logger');
//DB
const User = models.user;
// login Router
router.post('/login', isNotLoggedIn, (req,res,next) => {
	passport.authenticate('local', (err, user, info) => {
		const failureRedirect = '/';
		const successRedirect = '/';
		if(err){
			logger.error(err);
			return next(err);
		}
		if(!user){
			req.flash('loginError', info.message);
			return res.redirect(failureRedirect);
		}
		return req.login(user, (err) => {
			if(err){
				logger.error(err);
				return next(err);
			}
			return res.redirect(successRedirect);
		});
	})(req,res,next);
});

router.get('/logout', isLoggedIn, (req,res) => {
	req.logout();
	res.redirect('/');
});

// Join Router
router.post('/join', isNotLoggedIn, async (req,res,next) => {
	try {
		const { username, nick, password } = req.body;
		const user = await User.findOne({where : {user_id: username}});
		if(user) {
			req.flash('joinError', '이미 가입된 아이디입니다.');
			return res.redirect('/join');
		}
		else {
			const password_crypt = await bcrypt.hash(password, 10);
			await User.create({
				user_id: username,
				nick,
				provider: 'local',
				password: password_crypt,
			});
			return res.redirect('/');
		}
	} catch(err) {
		logger.error(err);
		next(err);
	}
});

// KAKAO OAuth
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback' , passport.authenticate('kakao', {
	failureRedirect : '/',
}), (req,res) => {
	res.redirect('/');
});

// FB OAuth
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook'));

//Google OAuth
router.get('/google');
router.get('/google/callback');

module.exports = router;