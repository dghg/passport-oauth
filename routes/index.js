const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.get('/', (req,res) => {
	if(req.isAuthenticated()){
		res.render('main', {
			user: req.user,
		});
	}
	else{
		res.render('login');
	}
});

router.get('/join', isNotLoggedIn, (req,res) => {
	res.render('join');
});

router.get('/info', isLoggedIn, (req,res) => {
	const { nick ,provider} = req.user;
	res.render('userinfo', {
		nick,
		provider,
	});
});
module.exports = router;