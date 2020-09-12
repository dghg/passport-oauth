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
			const { id, displayName } = profile;
			let user = await User.findOne({where : {user_id:id}});
			if(!user) { // create user
 				user = await User.create({
					user_id: id,
					nick: displayName,
					provider: 'kakao',
				});
			}
			done(null, user);
			
		} catch(err) {
			logger.error(err);
			done(err);
		}	
	}));
}