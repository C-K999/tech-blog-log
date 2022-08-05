const { User } = require('../models');

const userData = [
    {
        username: 'Xandromus',
        password: 'Xanderclaus'
    },
    {
        username: 'Lernantino',
        password: 'learner123'
    },
    {
        username: 'ctkoo',
        password: 'abcd1234'
    },
    {
        username: 'Joe',
        password: 'ligmabZ'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;