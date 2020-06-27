const express = require('express');
const route = express.Router();
const homeController = require('./controllers/HomeController');

route.get('/', homeController.landingPage);

module.exports = route;
