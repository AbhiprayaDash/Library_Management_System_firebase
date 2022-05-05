const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { initializeFirebase } = require('../firebase');

// eslint-disable-next-line no-unused-vars
const fireapp = initializeFirebase();
const auth = getAuth();

// signin through email and password
const customSignIn = (req, res) => {
  const response = {};
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(() => {
      auth.currentUser
        .getIdToken(true)
        .then((idToken) => res.status(201).json(idToken));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      response.errorCode = errorCode;
      response.errorMessage = errorMessage;
      return res.status(400).json(response);
    });
};
const googleSignIn = () => {};

module.exports = {
  customSignIn,
  googleSignIn,
};
