
const UserService = require('../services/UserService');
const UserRequest = require('../models/UserRequest');

const userService = new UserService();

exports.index = (req, res) => {
    res.render('register');
}

exports.register = async function(req, res) {
    const request = new UserRequest(req.body);
    try {
        const user = await userService.register(request);
        return res.send(`Olá ${user.name}`);
    }
    catch (e) {
        console.log(e);
        req.flash('errors', e.errors);
        req.session.save(function () {
            return res.redirect('back');
        });
    }

}