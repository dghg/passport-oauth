const express = require('express');
const router = express.Router();


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

router.get('/join', (req,res) => {
	res.render('join');
});
module.exports = router;