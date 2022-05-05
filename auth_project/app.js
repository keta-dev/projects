const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Keta-Auth:bXqL6ULgomTcfoix@cluster0.z289s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// connecting the routes and the controllers: ie register the routes in our application
app.use(authRoutes);