const firebase = require('firebase');
const config = require('../src/config');
firebase.initializeApp(config);

const firebaseDb = firebase.firestore();
const collection = firebaseDb.collection('AdminUsers')

//Login
exports.login = (req, res) => {
  // ユーザ情報を保持
  const user = {
    mail: req.body.mail,
    password: req.body.password,
    uid: ""
  }

  // firebaseによるログイン認証処理
  firebase.auth().signInWithEmailAndPassword(user.mail, user.password)
    .then(data => {
      // ユーザIDを保持
      user.uid = firebase.auth().currentUser.uid;

      console.log("user.uid:", user.uid);

      // 認証に成功したらユーザのトークン情報を取得する
      return data.user.getIdToken();
    })
    .then(token => {

      // 戻り値
      const result = { token: token, isAdmin: false };

      // 管理者判定
      var docRef = collection.doc(user.uid);
      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("管理者情報:", doc.data());
          result.isAdmin = true;
        }

        // 戻り値を返す
        return res.json({ result });

      }).catch(function (error) {
        console.error("ログインに失敗しました。内部エラー:", error.message);
        return res.status(403).json({ error: "ログインに失敗しました。内部エラー:" + error.message });
      });
    })
    .catch(error => {
      console.error(error.message);
      // ログイン失敗
      return res.status(403).json({ error: "ログインに失敗しました。メールアドレス、パスワードを確認してください。" });
    })
};