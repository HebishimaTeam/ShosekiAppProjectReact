const firebase = require('firebase');

// 書籍情報取得
exports.getBookInfo = (req, res) => {
    return res.json('getBookIn');
};

// 書籍情報削除
exports.deleteBookInfo = (req, res) => {
    return res.json('deleteBookInfo');
};

// 書籍情報更新
exports.updateBookInfo = (req, res) => {
    return res.json('updateBookInfo');
};