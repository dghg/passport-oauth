const FacebookStrategy = require('passport-facebook').Strategy;
const models = require('../../models');
const User = models.user;
const logger = require('../../logger');

module.exports = (passport) => {
	passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
	    clientSecret: process.env.FACEBOOK_APP_SECRET,
	    callbackURL: "http://a3a3a.run.goorm.io/auth/facebook/callback"
  	},
 	 async (accessToken, refreshToken, profile, done) => {
		try{
			const {id ,displayName} = profile;
			let user = await User.findOne({where : {user_id:id}});
			if(!user){
				user = await User.create({
					user_id: id,
					nick: displayName,
					provider: 'facebook',
				});
			}
			done(null, user);
			
		} catch(err){
			logger.error(err);
			done(err);
		}
  	}
	));

};