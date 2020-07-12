const functions = require('firebase-functions');
const app = require('express')();
// ユーザ関連機能
const {
    login
} = require('./src/User');

// 書籍関連機能
const {
    getBookInfo,
    deleteBookInfo,
    updateBookInfo,
    addBookInfo
} = require('./src/Book');

// ログイン処理を設定
app.post('/login', login);

// 書籍取得処理を設定
app.get('/getBookinfo', getBookInfo);
// 書籍削除処理を設定
app.delete('/deleteBookInfo', deleteBookInfo);
// 書籍更新処理を設定
app.post('/updateBookInfo', updateBookInfo);
// 書籍追加処理を設定
app.post('/addBookInfo', addBookInfo);

// HTTPリクエストトリガー設定
exports.api = functions.region('us-central1').https.onRequest(app);
