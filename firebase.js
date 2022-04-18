const { initializeApp } = require('firebase/app');
const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');

const firebaseConfig = {
  apiKey: 'AIzaSyCwd0Qa0X4ZvjD9cbR-dGmo19OOesysD2I',
  authDomain: 'friendlychat-c1381.firebaseapp.com',
  projectId: 'friendlychat-c1381',
  storageBucket: 'friendlychat-c1381.appspot.com',
  messagingSenderId: '728140922754',
  appId: '1:728140922754:web:7cfcb7958ac9febf79599b',
};
// eslint-disable-next-line no-unused-vars
const initializeFirebase = () => initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://friendlychat-c1381.firebaseio.com',
});
// Initialize Firebas
module.exports = {
  initializeFirebase,
  admin,
};
