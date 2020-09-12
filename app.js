const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const logger = require('./logger');
require('dotenv').config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');
passportConfig(passport);

// Router
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
// App
const app = express();

// DB
sequelize.sync();

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

// rendering setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/', indexRouter);
app.use('/auth', authRouter);


app.use((err, req, res, next) => {
  if (!err) {
    const err = new Error('Not Found');
    err.status = 404;
  }
  logger.error(err.message);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  logger.info(`Server Listening on port ${process.env.PORT}`);
});
