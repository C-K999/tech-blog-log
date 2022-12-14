const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'dated'
            ],
            order: [
                ['dated', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'dated'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findbyPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'dated'
            ],
            order: [
                ['dated', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'dated'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        res.json(dbPostData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        })
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found' });
                return;
            }
            res.json(dbPostData);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;