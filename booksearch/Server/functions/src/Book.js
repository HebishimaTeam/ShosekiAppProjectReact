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

// 書籍情報全件取得
exports.getAllBookInfo = (req, res) => {
    let bookList = [];
    collection.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                bookList.push(doc.data());
                console.log(doc.data());
            })
            return res.json(bookList);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({error: "全件取得に失敗しました:" + error.message});
        });
};

// 書籍情報削除
exports.deleteBookInfo = (req, res) => {

    console.log("deleteBookInfo");
    console.log(req.body.isbn);

   // 削除
   collection.doc(req.body.isbn).delete()
   .then(function () {
       console.log("書籍情報を削除しました。");
       return res.json('deleteBookInfo');
   })
   .catch(error => {
       console.error(error.message);
       return res.status(403).json({ error: "書籍情報の削除に失敗しました。" });
     })
};

// 書籍情報更新
exports.updateBookInfo = (req, res) => {

    const update_book_info = {
        comment: req.body.comment,
        image: req.body.image,
        link: req.body.link,
        title: req.body.title
    }
    collection.doc(req.body.isbn).set({
        comment: update_book_info.comment,
        image: update_book_info.image,
        link: update_book_info.link,
        title: update_book_info.title
    })
    .then(function () {
        console.log("bookInfo successfully updated!");
    })
    .catch(error => {
        console.error("Error writing document: ", error);
    });

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

// 書籍情報更新
exports.updateBookInfo = (req, res) => {

}   