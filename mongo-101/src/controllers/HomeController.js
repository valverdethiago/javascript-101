const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo : 'Primieiro teste com mongo',
    descricao : 'Este é meu primeiro documento criado com mongo e nodejs. IIIIRRRRAAAAAAYYYY!'
})
.then(data => console.log(data))
.catch(error => console.log(error));

exports.landingPage = (req, res) => {
    res.render('index');
}