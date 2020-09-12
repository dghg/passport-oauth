const passport = require('passport');
const local = require('./strategy/local');
const models = require('../models');
const User = models.user;
const logger = require('../logger');
module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findOne({where: {id}});
			done(null, user);
		} catch(err) {
			logger.error(err);
			done(err);
		}
	});
	
	local(passport);

};