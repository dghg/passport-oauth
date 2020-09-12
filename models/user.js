module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		user_id: {
		  type: DataTypes.STRING(40),
		  allowNull: false,
		  unique: true,
		},
		nick: {
		  type: DataTypes.STRING(15),
			allowNull: false,
		},
		provider: {
		  type: DataTypes.STRING(10),
		  allowNull: false,
		  defaultValue: 'local',
		},
		password : {
			type: DataTypes.STRING(100),
			allowNull: true,
		}
	},{
		timestamps: true,
		paranoid: true,
		charset:'utf8', 
		collate:'utf8_general_ci',
	});
};

