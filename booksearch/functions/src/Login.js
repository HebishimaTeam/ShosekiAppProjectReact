const functions = require('firebase-functions');

//Login
module.exports = functions.https.onRequest((req, res) => {
    if (req.query.param === undefined) {
      // エラー
      res.status(400).send('Login param undefined');
    } else {
      // 成功
      console.log(req.query.param);
      res.status(200).end(req.query.param);
    }
})