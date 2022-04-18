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
  startAfter,
  onSnapshot,
  orderBy,
  limit,
} = require('firebase/firestore');

const { initializeFirebase } = require('../firebase');

const fireapp = initializeFirebase();
const db = getFirestore(fireapp);

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
const deleteBook = async (req, res) => {
  try {
    await deleteDoc(doc(db, 'books', req.params.bookid));
    return res.status(200).send('Deleted successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
};

// eslint-disable-next-line consistent-return
const getAllBooks = async (req, res) => {
  // eslint-disable-next-line prefer-const
  let books = [];
  // eslint-disable-next-line prefer-const
  let count = 0;
  try {
    const q = query(collection(db, 'books'), orderBy('name'));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   console.log('inside');
    //   // eslint-disable-next-line prefer-const
    //   let tempbooks = [];
    //   console.log(querySnapshot);
    //   querySnapshot.forEach((document) => {
    //     console.log(document);
    //     tempbooks.push(document.data());
    //     console.log(document.data());
    //   });
    // });
    // console.log(unsubscribe);

    onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
      querySnapshot.forEach((document) => {
        // console.log(document.data());
        books.push(document.data());
      });
      // console.log(books);
      const changes = querySnapshot.docChanges();
      console.log(changes[0]);
      if (changes[0].type === 'modified') {
        return res.json(books);
      }
      // count++;
      return res.status(200).json(books);
    });
    // onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
    //   querySnapshot.docChanges().forEach((change) => {
    //     console.log('inside');
    //     if (change.type === 'added') {
    //       console.log('New city: ', change.doc.data());
    //     }
    //     if (change.type === 'modified') {
    //       console.log('Modified city: ', change.doc.data());
    //     }
    //     if (change.type === 'removed') {
    //       console.log('Removed city: ', change.doc.data());
    //     }
    //   });
    // });
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((document) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   books.push(document.data());
    // });
  } catch (error) {
    return res.status(404).send('Not Found');
  }
};
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
