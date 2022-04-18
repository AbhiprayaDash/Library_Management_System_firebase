const Router = require('express');
const signUpController = require('../controllers/signup_controller');

const router = Router();

router.post('/', signUpController.customSignUp);

module.exports = router;
