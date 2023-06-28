const router = require('express').Router();
const {Project, User} = require('../models');
const auth = require('../utils/auth');

router.get('/profile', auth ,async (req, res) => {
    const userData = await User.findByPk(req.session.user_id, {
        include: [{
            model: Project
        }]
    });
    let newUserData = userData.get({plain: true});
    res.render('profile', newUserData);
})