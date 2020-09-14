const GoogleStrategy = require('passport-google-oauth20').Strategy;
const models = require('../../models');
const logger =require('../../logger');
const User = models.user;

module.exports = (passport) => {
	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CONSUMER_KEY,
		clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
		callbackURL: 'http://a3a3a.run.goorm.io/auth/google/callback',
	}, async(accessToken, refreshToken, profile, done) => {
		try{
			const {id, displayName} = profile;
			let user = await User.findOne({where: {user_id:id}});
			if(!user){
				user = await User.create({
					user_id: id,
					nick: displayName,
					provider: 'google',
				});
			}
			done(null,user);
		} catch(err){
			logger.error(err);
			done(err);
		}
		}));
};