const express = require('express');
const bodyParser = require('body-parser');
const signInRouter = require('./routes/signin_route');
const signUpRouter = require('./routes/signup_route');
const libraryRouter = require('./routes/library_route');
// Your web app's Firebase configuration

const app = express();
// express middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/api/v1/signin', signInRouter);
app.use('/api/v1/signup', signUpRouter);
app.use('/api/v1/library', libraryRouter);
// Add a new book to the Library

app.listen(3000, () => {
  console.log('App listening to post 3000');
});
