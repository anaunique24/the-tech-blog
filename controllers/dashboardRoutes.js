const router = require('express').Router();
const { Posts, User, Comment } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try{
        const dashboardData = await Posts.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const newDashboard = dashboardData.map(dashboard => dashboard.get({ plain: true}));
    res.render('dashboard', {newDashboard})
    } catch (error) {
        res.status(500).json(error);
    };
});

router.get('/edit/:id', auth, async (req, res) => {
    try{
        const postData = await Posts.findByPk({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        const newPostData = postData.map(post => post.get ({ plain:true }));
        res.render('edit', {newPostData});
    } catch (error) {
        res.status(500).json(error);
    };
});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;