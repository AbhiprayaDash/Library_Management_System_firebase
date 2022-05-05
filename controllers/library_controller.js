const {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  orderBy,
} = require('firebase/firestore');

const { initializeFirebase } = require('../firebase');

const fireapp = initializeFirebase();
const db = getFirestore(fireapp);

// add book to library collection
const addBook = async (req, res) => {
  try {
    await addDoc(collection(db, 'books'), {
      name: req.body.book,
      author: req.body.author,
      genre: req.body.genre,
      user: req.user,
      AddedAt: Date.now(),
    });
    return res.status(201).send('Created');
  } catch (e) {
    return res.status(400).json(e);
  }
};
// update book in library collection
const updateBook = async (req, res) => {
  try {
    const docRef = doc(db, 'books', req.params.bookid);
    await updateDoc(docRef, {
      name: req.body.book,
    });
    return res.status(200).send('Document Updated Successfully');
  } catch (error) {
    return res.status(400).send(error);
  }
};

// delete book from library collection
const deleteBook = async (req, res) => {
  try {
    await deleteDoc(doc(db, 'books', req.params.bookid));
    return res.status(200).send('Deleted successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
};

// eslint-disable-next-line consistent-return
// get all books from library
const getAllBooks = async (req, res) => {
  // eslint-disable-next-line prefer-const
  let books = [];
  // eslint-disable-next-line prefer-const
  try {
    const q = query(collection(db, 'books'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      // doc.data() is never undefined for query doc snapshots
      books.push(document.data());
    });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(404).send('Not Found');
  }
};

// get a specific book based on book id
const getBook = async (req, res) => {
  // eslint-disable-next-line prefer-const
  let books = [];
  try {
    const q = query(
      collection(db, 'books'),
      where('user', '==', req.params.userid),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      // doc.data() is never undefined for query doc snapshots
      books.push(document.data());
    });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(404).send('Not Found');
  }
};

module.exports = {
  addBook,
  getBook,
  getAllBooks,
  deleteBook,
  updateBook,
};
