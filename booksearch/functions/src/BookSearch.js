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

//2022/02/21に作成したbookSearch()の追記
import { firebaseDb } from './index'

const collection = firebaseDb.collection('books')

let bookList = []

export const bookSearch = (bookName) => {
    console.log(bookName)

    collection.where("title", "==", bookName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            bookList.push(doc.data());
            console.log(doc.data());
        })
        return bookList;
    })

    // collection.get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.data().image);
    //     })
    // })
}