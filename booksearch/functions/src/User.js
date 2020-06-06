const firebase = require('firebase');
const config = require('../src/config');
firebase.initializeApp(config);

//Login
exports.login = (req, res) => {
  // ユーザ情報を保持
  const user = {
    mail: req.body.mail,
    password: req.body.password
  }

  // res.header('Access-Control-Allow-Origin', "*");
  // res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

  // firebaseによるログイン認証処理
  firebase.auth().signInWithEmailAndPassword(user.mail, user.password)
    .then(data => {
      // 認証に成功したらユーザのトークン情報を取得する
      return data.user.getIdToken();
    })
    .then(token => {
      // トークンを返す
      return res.json({ token });
    })
    .catch(error => {
      console.error(error);
      // エラーの場合はステータスを403(アクセス拒否)に設定しエラーコードを返す
      return res.status(403).json({ error: error.code });
    })
};