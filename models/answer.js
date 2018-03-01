'use strict'
module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {model: 'User', key: 'id'}
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {model: 'Question', key: 'id'}
        },
        text: {
            type: DataTypes.TEXT(255),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'Text have to many characters'
                }
            }
        }
    }, {
        createdAt: 'created_at',

        updatedAt: 'updated_at'
        // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    })
    Answer.associate = (models) => {
        Answer.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'})
    }
    Answer.publicFields = ['id', 'text']

    return Answer
}

