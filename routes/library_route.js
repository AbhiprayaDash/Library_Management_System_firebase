const Router = require('express');
const libraryController = require('../controllers/library_controller');
const Auth = require('../middleware/auth');

const router = Router();

router.post('/book/', Auth, libraryController.addBook);// route to add book to the library
router.get('/book/:userid', Auth, libraryController.getBook);// route to get a book based on user Id
router.get('/books/', Auth, libraryController.getAllBooks);// route to get all books
router.delete('/book/:bookid', Auth, libraryController.deleteBook);// route to delete a specific book based on book id
router.patch('/book/:bookid', Auth, libraryController.updateBook);// route to update a book based on book id

module.exports = router;
