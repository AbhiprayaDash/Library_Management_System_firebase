const Router = require('express');
const libraryController = require('../controllers/library_controller');
const Auth = require('../middleware/auth');

const router = Router();

router.post('/book/', Auth, libraryController.addBook);
router.get('/book/:userid', Auth, libraryController.getBook);
router.get('/books/', Auth, libraryController.getAllBooks);
router.delete('/book/:bookid', Auth, libraryController.deleteBook);
router.patch('/book/:bookid', Auth, libraryController.updateBook);

module.exports = router;
