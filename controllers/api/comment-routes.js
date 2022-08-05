const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({});
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }  
});

router.get('/:id', async (req, res) => {
    try {
      const dbCommentData = await Comment.findbyPk(req.params.id);
      res.status(200).json(dbCommentData);
    } catch (err) {
      res.status(500).json(err);
    }  
});

router.post('/', withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.json(dbCommentData);
     } catch (err) {
        res.status(500).json(err);
    }  
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comment.update({
            comment_text: req.body.comment_text
        }, {
            where: {
                id: req.params.id
            }
        });
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.status(200).json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    }  
});

router.delete('/:id', withAuth, (req, res) => {
    try{
        const dbCommentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.json(dbCommentData);
    } catch (err) {
        res.status(500).json(err);
    } 
});