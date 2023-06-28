const User = require('./User');
const Posts = require('./Posts');
const Comment = require('./Comment');

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Posts.belongsTo(User, {
    foreignKey: 'user_id'
});

Posts.hasMany(Comment, {
    foreignKey: 'posts_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Posts, {
    foreignKey: 'posts_id'
})

module.exports = { User, Posts, Comment}