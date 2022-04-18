const { getAuth } = require('firebase/auth');
// eslint-disable-next-line consistent-return

const { initializeFirebase, admin } = require('../firebase');

// eslint-disable-next-line no-unused-vars
const fireapp = initializeFirebase();

const Auth = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization;
  admin.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken.uid;
      next();
    // ...
    })
    .catch((error) => res.status(401).json(error));
};

module.exports = Auth;
