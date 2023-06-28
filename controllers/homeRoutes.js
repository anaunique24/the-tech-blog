const router = require('express').Router();
const {Posts, User, Comment} = require('../models');
const auth = require('../utils/auth');



router.get('/profile', auth ,async (req, res) => {
    const userData = await User.findByPk(req.session.user_id, {
        include: [{
            model: Posts
        }]
    });
    let newUserData = userData.get({plain: true});
    res.render('profile', newUserData);
});

router.get('/', async (req, res) => {
    try{
    const postData = await Posts.findAll();
    const newPostData = postData.map(post => post.get({ plain: true}));
    res.render('allposts', {newPostData})
    } catch (error) {
        res.status(500).json(error)
    };
});

module.exports = router;