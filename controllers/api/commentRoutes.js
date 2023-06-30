const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({})

        res.json(commentData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id,
              },
            });
            res.json(commentData);
          } catch (error) {
            res.status(500).json(error);
          }
        });

router.post('/', auth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body, // the "..." is getting one object and passing it instead of all objects in the table array
            user_id: req.session.user_id,
            post_id: req.session.post_id,
          });
          res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error)
    };
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updateComment = await Comment.update({
            comment_text: req.body.comment_text,
        },
        {
          where: {
            id: req.params.id,
          }, 
        })
        if (updateComment === 0) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        };
        res.json({ message: 'Comment updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    };
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deleteComment) {
            res.status(404).json({ message: 'No comment found with this ID!'});
            return;
        }
        res.json(deleteComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;