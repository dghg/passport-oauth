require('dotenv').config();

module.exports = {
	development: {
		username: 'root',
		password: process.env.SEQ_PASSWORD,
		database: 'passport',
		host: '127.0.0.1',
		dialect: 'mysql',
		operatorAliases: 'false',
	},
	production: {
		username: 'root',
		password: process.env.SEQ_PASSWORD,
		database: 'passport',
		host: '127.0.0.1',
		dialect: 'mysql',
		operatorAliases: 'false',		
	},
};