const router = require('express').Router();
const {Posts, User, Comment} = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
    const postData = await Posts.findAll({
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
    const newPostData = postData.map(post => post.get({ plain: true}));
    res.render('homepage', {newPostData})
    } catch (error) {
        res.status(500).json(error)
    };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('post/:id', async (req, res) => {
    try{
        const postData = await Posts.findByPk({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
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
        const newPostData = postData.map(post => post.get({ plain: true}));
        res.render('single-post', {newPostData})
    } catch (error) {
        res.status(500).json(error)
    };
});

router.get('/comments', async (req, res) => {
    try{
        const commentData = await Comment.findByPk({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
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
        const newCommentData = commentData.map(comment => comment.get({plain:true}));
        res.render('comment', {newCommentData});
    } catch (error) {
        res.status(500).json(error)
    };
});



module.exports = router;