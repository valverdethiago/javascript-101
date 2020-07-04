const LoginRequest = require('../models/LoginRequest');
const UserService = require('../services/UserService');

const userService = new UserService();

exports.index = (req, res) => {
    res.render('login');
}

exports.login = (req, res) => {
    const request = new LoginRequest(req.body);
    try {
        const user = userService.login(request);
        req.flash('success', `User ${user.name} logged in successfully.`);
        req.session.user = user;
        req.session.save(function() {
            return res.redirect('welcome');
        });
    }
    catch(e) {
        console.log(e);
        req.flash('errors', e.errors);
        req.session.save(function () {
            return res.redirect('back');
        });
    }
}