// Passport Local Strategy
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../../models');
const User = models.user;
const logger = require('../../logger');

const info = { message: '이메일 또는 비밀번호 틀림'};
module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
	}, async(username, password, done) => {
		try{
			const user = await User.findOne({where : {user_id: username}});
			if(user){
				const isRightPW = await bcrypt.compare(password, user.password);
				if(isRightPW){
					done(null, user);
				}
				else{
					done(null, false, info);
				}
			}
			else{ // not exists user
				done(null, false, info);
			}
		} catch(err) {
			logger.error(err);
			done(err);
		}
	}));
};