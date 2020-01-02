module.exports = (app) => {
    const authorize = require('../../config/auth');
    const user = require('../resources/userResource');


    app.post('/api/user', user.create);
    app.post('/api/user/login', user.login);
    app.get('/api/user', authorize, user.findAll);
    app.get('/api/user/:userId', authorize, user.findById);
    app.put('/api/user/:userId', authorize, user.updateById);
    app.delete('/api/user/:userId', authorize, user.deleteById);
    app.put('/api/user/p/:userId', authorize, user.updatePasswordById)
}