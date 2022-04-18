const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { initializeFirebase } = require('../firebase');

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
const fireapp = initializeFirebase();
const auth = getAuth();
const customSignUp = (req, res) => {
  const response = {};
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      const { user } = userCredential;
      response.user = user;
      return res.status(201).json(response);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      response.errorCode = errorCode;
      response.errorMessage = errorMessage;
      return res.status(400).json(response);
    });
};
module.exports = {
  customSignUp,
};
