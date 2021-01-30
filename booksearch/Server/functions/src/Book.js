const firebase = require('firebase')
const firebaseDb = firebase.firestore()
const collection = firebaseDb.collection('books')

// N-gram形式に変換
const ngram = (words, n) => {
    var i
    var grams = []
    for (i = 0; i <= words.length - n; i++) {
        grams.push(words.substr(i, n).toLowerCase())
    }
    return grams
}

// 書籍情報取得
exports.getBookInfo = (req, res) => {
    let bookList = []
    const book = {
        title: req.query.title,
    }

    // タイトルをunigram形式で取得
    const searchWords = ngram(book.title, 1)

    // unigram形式をmapに変換
    var tokenMap = {}
    searchWords.forEach((item) => {
        tokenMap[item] = true
    })

    // DBに登録されているmapをもとに検索条件を設定
    let query = collection
    searchWords.forEach((word) => {
        query = query.where(`tokenMap.${word}`, '==', true)
    })

    // 取得
    query
        .get()
        .then((datas) => {
            datas.forEach((doc) => {
                bookList.push(doc.data())
            })
            // jsonに変換して書籍情報を返す
            return res.json(bookList)
        })
        .catch((error) => {
            console.log(error)
            return res.status(403).json({ error })
        })
}

// 書籍情報全件取得
exports.getAllBookInfo = (req, res) => {
    let bookList = []
    collection
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                bookList.push(doc.data())
                console.log(doc.data())
            })
            return res.json(bookList)
        })
        .catch((error) => {
            console.log(error)
            return res
                .status(500)
                .json({ error: '全件取得に失敗しました:' + error.message })
        })
}

// 書籍情報削除
exports.deleteBookInfo = (req, res) => {
    console.log('deleteBookInfo')
    console.log(req.body.isbn)

    // 削除
    collection
        .doc(req.body.isbn)
        .delete()
        .then(() => {
            console.log('書籍情報を削除しました。')
            return res.json('deleteBookInfo')
        })
        .catch((error) => {
            console.error(error.message)
            return res.status(403).json({ error: '書籍情報の削除に失敗しました。' })
        })
}

// 書籍情報更新
exports.updateBookInfo = (req, res) => {
    // unigram形式に変換
    const searchWords = ngram(req.body.title, 1)

    // mapに変換
    var tokenMap = {}
    searchWords.forEach((item) => {
        tokenMap[item] = true
    })

    const update_book_info = {
        comment: req.body.comment,
        image: req.body.image,
        title: req.body.title,
        tokenMap: tokenMap,
    }

    //"marge : true"によって既存のデータを残したまま更新
    collection
        .doc(String(req.body.isbn))
        .set(update_book_info, { merge: true })
        .then(() => {
            console.log('書籍情報を更新しました。')
            return
        })
        .catch((_error) => {
            return res.status(403).json({ error: '書籍情報の更新に失敗しました。' })
        })

    return res.json({ sucess: '書籍情報の更新に成功しました。' })
}

// 書籍情報追加
exports.addBookInfo = (req, res) => {

    // unigram形式に変換
    const searchWords = ngram(req.body.title, 1)

    // mapに変換
    var tokenMap = {}
    searchWords.forEach((item) => {
        tokenMap[item] = true
    })
    const add_book_info = {
        isbn: req.body.isbn,
        comment: req.body.comment,
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        tokenMap: tokenMap,
    }
    
    var docRef = collection.doc(add_book_info.isbn)

    docRef
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(403).json({ error: '書籍情報は既に存在しています。' })
            } else {
                // Add a new document in collection "books" with ID 'id'
                return collection.doc(add_book_info.isbn).set(add_book_info)
            }
        })
        .then(() => {
            return res.json({ sucess: '書籍情報の追加に成功しました。' })
        })
        .catch((error) => {
            console.error(error.message)
            return res.status(403).json({ error: '書籍情報の追加に失敗しました。' })
        })
}

/**書籍情報をまとめて追加するAPI */
exports.addBookList = (req, res) => {
    if (Array.isArray(req.body) && req.body.length > 0) {
        /**登録失敗した項目 */
        const errorItems = []
        /**登録成功した項目 */
        const acceptedItems = []
        //書籍登録処理をまとめて実行
        return Promise.all(
            //リクエストの配列から、書籍登録処理を生成
            req.body.map(bookInfo => {
                var docRef = collection.doc(bookInfo.isbn)
                return docRef
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            throw new Error('書籍情報は既に存在しています。')
                        } else {
                            // unigram形式に変換
                            const searchWords = ngram(bookInfo.title, 1)

                            // mapに変換
                            var tokenMap = {}
                            searchWords.forEach((item) => {
                                tokenMap[item] = true
                            })
                            const add_book_info = {
                                isbn: bookInfo.isbn,
                                comment: "",
                                image: bookInfo.image,
                                title: bookInfo.title,
                                description: req.body.description,
                                tokenMap: tokenMap
                            }
                            return collection.doc(bookInfo.isbn).set(add_book_info)
                        }
                    })
                    .then(() => {
                        return acceptedItems.push(bookInfo)
                    })
                    .catch((error) => {
                        //エラーデータを追加
                        bookInfo.error = error.message
                        errorItems.push(bookInfo)
                    })
            }))
            //全登録処理終了後
            .then(() => {
                if (acceptedItems.length === req.body.length) {
                    return res.json({ sucess: '書籍情報の追加に成功しました。' })
                }
                else {
                    const accepts = acceptedItems.map(item => `${item.title}(${item.isbn})`)
                    const reasons = errorItems.map(item => `${item.title}(${item.isbn}):${item.error}`)
                    return res.json({
                        error: `書籍の追加に失敗しました。`,
                        reason: reasons,
                        accepted: accepts
                    })
                }
            })
            .catch(error => {
                console.error(`unknown error : \n${JSON.stringify({
                    error: error.message,
                    requestHeader: req.headers,
                    requestBody: req.body
                })}`)
                return res.status(500).json({ error: `unknown error : ${error}` })
            })
    }
    else return res.status(421).json({ error: 'リクエストデータは有効な配列ではありません。' })
}
