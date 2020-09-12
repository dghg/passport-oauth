module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		id: {
		  type: DataTypes.STRING(40),
		  allowNull: false,
		  unique: true,
		},
		nick: {
		  type: DataTypes.STRING(15),
			allowNull: false,
		},
		money: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  defaultValue: 0,
		},
		password : {
			type: DataTypes.STRING(100),
			allowNull: false,
		}
	},{
		timestamps: true,
		paranoid: true,
	})
};

