
require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.connectionString, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => {
        app.emit('mongodb-connection-ready');
    })
    .catch(e => {
        console.log(e)
    });

const routes = require('./routes');
const path = require('path');

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(routes);

app.on('mongodb-connection-ready', () => {
    app.listen(3000, () => {
        console.log('App started. Access http://localhost:3000');
    });
});
