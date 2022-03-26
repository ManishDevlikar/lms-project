const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://manish:manish1234@cluster0.8b6eq.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/freecources', requireAuth, (req, res) => res.render('freecources'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.get('/html', requireAuth, (req, res) => res.render('html'));
app.get('/css', requireAuth, (req, res) => res.render('css'));
app.get('/javascript', requireAuth, (req, res) => res.render('javascript'));
app.get('/react', requireAuth, (req, res) => res.render('react'));
app.get('/node', requireAuth, (req, res) => res.render('node'));
app.get('/mongo', requireAuth, (req, res) => res.render('mongo'));

app.use(authRoutes);