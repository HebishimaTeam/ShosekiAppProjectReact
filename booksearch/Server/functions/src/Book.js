const firebase = require('firebase');
const firebaseDb = firebase.firestore();
const collection = firebaseDb.collection('books')

// N-gram形式に変換
const ngram = (words, n) => {
    var i;
    var grams = [];
    for (i = 0; i <= words.length - n; i++) {
        grams.push(words.substr(i, n).toLowerCase());
    }
    return grams;
}

// 書籍情報取得
exports.getBookInfo = (req, res) => {
    let bookList = [];
    const book = {
        title: req.query.title
    }

    // タイトルをunigram形式で取得
    const searchWords = ngram(book.title, 1);

    // unigram形式をmapに変換
    var tokenMap = {};
    searchWords.forEach(item => {
        tokenMap[item] = true;
    })

    // DBに登録されているmapをもとに検索条件を設定
    let query = collection;
    searchWords.forEach(word => {
        query = query.where(`tokenMap.${word}`, '==', true);
    });

    // 取得
    query.get()
        .then(datas => {
            datas.forEach(doc => {
                bookList.push(doc.data());
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
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                bookList.push(doc.data());
                console.log(doc.data());
            })
            return res.json(bookList);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: "全件取得に失敗しました:" + error.message });
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
            return res.json({ message: "書籍情報を削除しました。"});
        })
        .catch(error => {
            console.error(error.message);
            return res.status(403).json({ message: "書籍情報の削除に失敗しました。" });
        })
};

// 書籍情報更新
exports.updateBookInfo = (req, res) => {

    // unigram形式に変換
    const searchWords = ngram(req.body.title, 1);

    // mapに変換
    var tokenMap = {};
    searchWords.forEach(item => {
        tokenMap[item] = true;
    })

    const update_book_info = {
        comment: req.body.comment,
        image: req.body.image,
        title: req.body.title,
        tokenMap: tokenMap
    };

    //"marge : true"によって既存のデータを残したまま更新
    collection.doc(String(req.body.isbn)).set(update_book_info, { merge: true })
        .then(function () {
            console.log("書籍情報を更新しました。");
        })
        .catch(error => {
            return res.status(403).json({ error: "書籍情報の更新に失敗しました。" });
        });

    return res.json({ sucess: "書籍情報の更新に成功しました。" });
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

    var docRef = collection.doc(add_book_info.isbn);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            return res.status(403).json({ error: "書籍情報は既に存在しています。" });
        } else {
            // Add a new document in collection "books" with ID 'id'
            collection.doc(add_book_info.isbn).set(add_book_info)
                .then(function () {
                    console.log("書籍情報を追加しました。");
                })
                .catch(error => {
                    console.error(error.message);
                    return res.status(403).json({ error: "書籍情報の追加に失敗しました。" });
                });
            return res.json({ sucess: "書籍情報の追加に成功しました。" });
        }
    });

};