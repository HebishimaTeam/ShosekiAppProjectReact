const functions = require('firebase-functions');

//BookSearch
// module.exports = functions.https.onCall(async (data, context) => {
//     return "BookSearch";
// });

//BookSearch
module.exports = functions.https.onRequest((req, res) => {
    if (req.query.param === undefined) {
        // エラー
        res.status(400).send('BookSearch param undefined');
    } else {
        // 成功
        console.log(req.query.param);
        res.status(200).end(req.query.param);
    }
})