const functions = require('firebase-functions');
const app = require('express')();
// ユーザ関連機能
const {
    login
} = require('./src/User');

// 書籍関連機能
const {
    getBookInfo,
    getAllBookInfo,
    deleteBookInfo,
    updateBookInfo,
    addBookInfo,
    addBookList
} = require('./src/Book');

const cors = require('cors')({ origin: true });
app.use(cors);

// ログイン処理を設定
app.post('/login', login);

// 書籍取得処理を設定
app.get('/getBookInfo', getBookInfo);
// 書籍全件取得処理を設定
app.get('/getAllBookInfo', getAllBookInfo);
// 書籍削除処理を設定
app.post('/deleteBookInfo', deleteBookInfo);
// 書籍更新処理を設定
app.post('/updateBookInfo', updateBookInfo);
// 書籍追加処理を設定
app.post('/addBookInfo', addBookInfo);
// 書籍複数追加処理を設定
app.post('/addBookList', addBookList);

// HTTPリクエストトリガー設定
exports.api = functions.region('us-central1').https.onRequest(app);
