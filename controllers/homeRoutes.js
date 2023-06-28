const router = require('express').Router();
const {Post, User} = require('../models');
const auth = require('../utils/auth');

router.get('/profile', auth ,async (req, res) => {
    const userData = await User.findByPk(req.session.user_id, {
        include: [{
            model: Post
        }]
    });
    let newUserData = userData.get({plain: true});
    res.render('post', newUserData);
})