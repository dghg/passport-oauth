const kakaoStrategy = require('passport-kakao').Strategy;
const bcrypt = require('bcrypt');
const models = require('../../models');
const User = models.user;
const logger = require('../../logger');

const info = { message: '이메일 또는 비밀번호 틀림'};

module.exports = (passport) => {
	passport.use(new kakaoStrategy({
		clientID: process.env.KAKAO_REST,
		callbackURL: "http://a3a3a.run.goorm.io/auth/kakao/callback",
	}, async (accessToken, refreshToken, profile, done) => {
		try {
			let user = await User.findOne({where : {user_id:profile.id}});
			if(!user) { // create user
 				user = await User.create({
					user_id: profile.id,
					nick: profile.displayName,
					provider: 'kakao',
				});
			}
			console.log(profile.displayName+' Kakao.');
			done(null, user);
			
		} catch(err) {
			logger.error(err);
			done(err);
		}	
	}));
}