const Router = require('express');
const signInController = require('../controllers/signin_controller');

const router = Router();

router.post('/', signInController.customSignIn);
router.post('/google', signInController.googleSignIn);

module.exports = router;
