exports.welcomeController = (req, res) => {
    console.log('Entrou no post');
    res.render('welcome', req.body);
}