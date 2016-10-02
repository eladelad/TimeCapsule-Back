/**
 * Created by elad on 25/09/2016.
 */
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type:DataTypes.INTEGER,
            field: 'id',
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Day)
            }
        }
    });

    return User;
};