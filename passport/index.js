const passport = require('passport');

//Strategy
const local = require('./strategy/local');
const kakao = require('./strategy/kakao');
const fb = require('./strategy/facebook');
const google = require('./strategy/google');

const models = require('../models');
const User = models.user;
const logger = require('../logger');
module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		console.log("serialize - user.id:" + user.id);
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findOne({where: {id}});
			console.log("request - user.id:" + id);
			done(null, user);
		} catch(err) {
			logger.error(err);
			done(err);
		}
	});
	
	local(passport);
	kakao(passport);
	fb(passport);
	google(passport);
};