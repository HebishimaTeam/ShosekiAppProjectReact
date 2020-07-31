const firebase = require('firebase');
const firebaseDb = firebase.firestore();
const collection = firebaseDb.collection('books')

// 書籍情報取得
exports.getBookInfo = (req, res) => {
    let bookList = [];
    const book = {
        title: req.query.title
    }
    // TODO あいまい検索ができない
    // titleを条件に取得
    collection.where("title", "==", book.title).get()
        .then(datas => {
            datas.forEach(doc => {
                bookList.push(doc.data());
                console.log(doc.data());
            })
            // jsonに変換して書籍情報を返す
            return res.json(bookList);
        })
        .catch(error => {
            console.log(error);
            return res.status(403).json({ error })
        });
};

// 書籍情報削除
exports.deleteBookInfo = (req, res) => {

    console.log("deleteBookInfo");
    console.log(req.body.isbn);

    // 削除
    collection.doc(req.body.isbn).delete()
        .then(function () {
            console.log("Document successfully deleted!");
            return res.json('deleteBookInfo');
        })
        .catch(error => {
            console.log(error);
            return res.status(403).json({ error })
        });
};

// 書籍情報更新
exports.updateBookInfo = (req, res) => {
    return res.json('updateBookInfo');
};

// 書籍情報追加
exports.addBookInfo = (req, res) => {
    const add_book_info = {
        isbn: req.body.isbn,
        comment: req.body.comment,
        image: req.body.image,
        link: req.body.link,
        title: req.body.title
    };
    // Add a new document in collection "books" with ID 'id'
    collection.doc(add_book_info.isbn).set(add_book_info)
        .then(function () {
            console.log("bookInfo successfully written!");
        })
        .catch(error => {
            console.error("Error writing document: ", error);
        });
    return res.json('addBookInfo');
};
