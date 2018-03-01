'use strict'
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: 'First Name have too many characters!'
                }
            }
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: 'Last Name have too many characters!'
                }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'E-mail have too many characters!'
                },
                isEmail: true
            }
        },
        Password: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                // Remember to set the data value, otherwise it won't be validated
                this.setDataValue('Password', val)
                const salt = bcrypt.genSaltSync(10)
                const pass = bcrypt.hashSync(val, salt)
                this.setDataValue('password', pass)
            },
            validate: {
                isLongEnough: function(val) {
                    if (val.length < 2) {
                        throw new Error('Please choose a longer password')
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(50)
        }
    }, {
        createdAt: 'created_at',

        updatedAt: 'updated_at'
        // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    })

    User.authenticate = function(password, user) {

        if (bcrypt.compareSync(password, user.password)) {
            return user
        }
        else
            return false
    }

    User.publicFields = ['id', 'first_name', 'last_name', 'email', 'phone']

    return User
}

