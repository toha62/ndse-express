const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const db = require('./db/users');

const pagesRouter = require('./routes/pages');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');

const verify = (username, password, done) => {
  console.log('verify user: ', username, 'password: ', password);
  db.findByUsername(username, (err, user) => {
    if (err) {
      console.log('error: ', err);
      return done(err);
    }
    if (!user) {
      console.log('no user');
      return done(null, false);
    }
    if (!db.verifyPassword(user, password)) {
      console.log('wrong password for user: ', user);
      return done(null, false);
    }
    console.log('verify OK. User: ', user);
    return done(null, user);
  });
};

const options = {
  usernameField: 'username',
  passwordField: 'userpassword',
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  console.log('serialize user:', user);
  // eslint-disable-next-line no-underscore-dangle
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  console.log('deserialize user id: ', id);
  db.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    return cb(null, user);
  });
});

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pagesRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

async function start(PORT, DB_URL) {
  try {
    await mongoose.connect(DB_URL, {
      dbName: 'library',
    });
    console.log('Mongoose connected');

    app.listen(PORT, () => {
      console.log(`Server listening port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

// TEST TEST TEST
// app.get('/', (request, response) => {
//   response.render('../src/views/pages/main');
// });

// app.get('/api/user/login', (request, response) => {
//   response.render('../src/views/pages//login');
// });

// app.post(
//   '/api/user/login',
//   passport.authenticate('local', { failureRedirect: '/' }),
//   (request, response) => {
//     console.log('req.user: ', request.user);
//     response.redirect('/');
//   },
// );
// TEST TEST TEST

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line prefer-destructuring
const DB_URL = process.env.DB_URL;

start(PORT, DB_URL);
