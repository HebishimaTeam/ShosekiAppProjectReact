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
    updateBookInfo
} = require('./src/Book');

// ログイン処理を設定
app.post('/login', login);

// 書籍取得処理を設定
app.get('/bookinfo', getBookInfo);
// 書籍削除処理を設定
app.delete('/deleteBookInfo', deleteBookInfo);
// 書籍更新処理を設定
app.post('/updateBookInfo', updateBookInfo);

// HTTPリクエストトリガー設定
exports.api = functions.region('us-central1').https.onRequest(app);
