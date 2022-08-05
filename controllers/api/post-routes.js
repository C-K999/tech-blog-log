const router = require('express').Router();

const userRoutes = require('./user-routes');

const { Post, User, Comment } = require('../../models');

const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.use('/users', userRoutes);

router.post('/', async (req, res) => {
    try {

    }
});

module.exports = router;