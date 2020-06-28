const express = require('express');
const route = express.Router();
const homeController = require('./controllers/HomeController');
const welcomeController = require('./controllers/WelcomeController');

route.get('/', homeController.landingPage);
route.post('/post', welcomeController.welcomeController);

module.exports = route;
