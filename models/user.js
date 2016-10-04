/**
 * Created by elad on 25/09/2016.
 */
var bcrypt = require('bcrypt');
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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1,255]
            }
        },
        password_digest: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password_confirmation: {
            type: DataTypes.VIRTUAL
        }
    }, {
        underscored: true,
        indexes: [{unique: true, fields: ['email']}],
        instanceMethods: {
            authenticate: function(value) {
                if (bcrypt.compareSync(value, this.password_digest))
                    return this;
                else
                    return false;
            }
        },
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Day)
            }

        }
    });

    var hasSecurePassword = function(user, options, callback) {
        if (user.password != user.password_confirmation) {
            throw new Error("Password confirmation doesn't match Password");
        }
        bcrypt.hash(user.get('password'), 10, function(err, hash) {
            if (err) return callback(err);
            user.set('password_digest', hash);
            return callback(null, options);
        });
    };

    User.beforeCreate(function(user, options, callback) {
        user.email = user.email.toLowerCase();
        if (user.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });
    User.beforeUpdate(function(user, options, callback) {
        user.email = user.email.toLowerCase();
        if (user.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });

    return User;
};