import axios from 'axios'

/**
 * 書籍情報
 * @typedef {Object} BookInfo
 * @property {string} isbn
 * @property {string} title
 * @property {string} image
 * @property {string} comment
 * @property {string} link
 */

/**
 * APIのレスポンス
 * @typedef {Object} fetchResult
 * @property {BookInfo} [book]
 * @property {any} [err]
 */
/**
 * isbnをもとに書籍情報を取得する
 * @param {string} isbn
 * @returns { Promise<fetchResult> } 書籍情報を返すプロミスオブジェクト
 */
export const commonSearchBook = (isbn) => {
    const openbdApi = 'https://api.openbd.jp/v1/get?isbn='
    return new Promise(resolve => {
        let returnObj = { book: undefined, err: undefined }
        //google Books APiを検索
        const url = `${openbdApi}${isbn.toString().trim()}&pretty`
        axios.get(url)
            .then(res => {
                //結果データがnullの場合は失敗
                if (!res.data[0]) resolve({ ...returnObj, err: 'no data' })
                //検索成功パターン
                const newBook = {
                    isbn: res.data[0].summary.isbn,
                    title: res.data[0].summary.title,
                    image: res.data[0].summary.cover,
                    comment: res.data[0].onix.CollateralDetail.TextContent[0].Text
                }
                resolve({ ...returnObj, book: newBook })
            })
            .catch(err => {
                //検索失敗
                resolve({ ...returnObj, err: err })
            })
    })
}