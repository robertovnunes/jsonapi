const router = require('express').Router();

const userController = require('../controllers/user.controller');

module.exports = app => {
    app.use('/users', router);
    router.get('/', userController.getUsers);
    router.get('/:id', userController.getUserById);
    router.post('/', userController.createUser);
    router.patch('/:id', userController.patchUser);
    router.delete('/:id', userController.deleteUser);
};
