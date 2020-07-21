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

// 書籍情報追加
exports.addBookInfo = (req, res) => {
    return res.json('addBookInfo');
};

// 書籍情報削除
exports.deleteBookInfo = (req, res) => {
    return res.json('deleteBookInfo');
};

// 書籍情報更新
exports.updateBookInfo = (req, res) => {
    return res.json('updateBookInfo');
};