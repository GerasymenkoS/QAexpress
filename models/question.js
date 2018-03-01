'use strict'
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {model: 'User', key: 'id'}
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 100],
                    msg: 'Name have too many characters!'
                }
            }
        },
        text: {
            type: DataTypes.TEXT(255),
            allowNull: false,
            unique: false
        }
    }, {
        createdAt: 'created_at',

        updatedAt: 'updated_at'
        // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    })
    Question.associate = (models) => {
        Question.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'})
    }
    Question.publicFields = ['id', 'name', 'text']

    return Question
}

