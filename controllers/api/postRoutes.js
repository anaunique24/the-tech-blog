const router = require('express').Router();
const { Posts, User, Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
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
        res.json(postData.reverse());
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const postData = await Posts.findByPk({
        where: {
          id: req.params.id,
        },
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.post('/', auth, async (req, res) => {
    try {
      const postData = await Posts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
  
      res.json(postData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.put('/:id', auth, async (req, res) => {
    try {
      const [affectedRows] = await Posts.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (affectedRows === 0) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
  
      res.json({ message: 'Post updated successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', auth, async (req, res) => {
    try {
      const deletedRowCount = await Posts.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (deletedRowCount === 0) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;