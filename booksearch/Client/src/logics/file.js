import { commonSearchBook, fetchResult, BookInfo } from "./api";
import * as csvparser from "react-papaparse";

/**
 * データ一つ取得される度に実行されるコールバック
 *
 * @callback eachCallback
 * @param {fetchResult} fetchResult
 */

/**
 * CSVデータを持つFileオブジェクトのデータをもとに書籍情報を取得する
 * @param { File } file CSVデータの入ったファイルオブジェクト
 * @param { eachCallback } [callback] データが1つ取得される度に実行されるコールバック
 * @returns { Promise<BookInfo[]> } Promiseオブジェクト
 * @throws { Error }
 */
export const getArrayFromCsvFile = (file, callback) => {
    const errorMsg = 'Invalid file format'
    if (!file.name.endsWith(".csv")) throw new Error(errorMsg)

    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        //ファイルデータからデータを読み取れた場合の処理
        reader.addEventListener('load', () => {
            let list = []
            try {

                list = csvparser.readString(reader.result).data?.filter(item => item[0] !== '')
            } catch (error) {
                throw new Error('csv parse error')
            }
            let books = []

            //isbnのリストから書籍情報リストを取得する処理
            new Promise(resolve => {
                let count = 0
                list.forEach(obj => {
                    const isbn = obj[0]
                    try {
                        commonSearchBook(isbn).then(result => {
                            if (result.book) {
                                books.push(result.book)
                            }
                            else {
                                books.push({ ...result.book, })
                            }
                            if (callback) callback(result)

                            count += 1
                            //全部の取得が完了
                            if (count === list.length) resolve()
                        })
                    } catch (error) {
                        count += 1
                        //全部の取得が完了
                        if (count === list.length) resolve()
                    }
                })
            })
                //全リストからデータ取得が終了した場合の処理
                .then(() => {
                    resolve(books)
                }).catch(err => {
                    if (typeof err === 'string') err = new Error(err)
                    reject(err)
                })
        })

        //ファイル読み取り失敗時
        reader.onerror = () => reject(new Error(errorMsg))

        reader.readAsText(file)
    })
}