const Router = require('express');
const signInController = require('../controllers/signin_controller');

const router = Router();

router.post('/', signInController.customSignIn);// route for custom sign in using email and password
router.post('/google', signInController.googleSignIn);// route for google login

module.exports = router;
