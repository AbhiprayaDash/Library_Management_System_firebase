const Router = require('express');
const signUpController = require('../controllers/signup_controller');

const router = Router();

router.post('/', signUpController.customSignUp);// route for custom sign up using email and password

module.exports = router;
