import React, { useState } from 'react';
import CSVReader from "../../atoms/CSVReader";
import { Button, TextBox, Validation } from '../../atoms/index';
import { commonSearchBook } from "../../logics/api";
import { getArrayFromCsvFile } from "../../logics/file";
import { Book } from './index';

const BookAddForm = () => {
    const [isbn, setIsbn] = useState('')
    const [newBook, setBook] = useState(null)
    const [searchedMsg, setSearchedMessage] = useState('ここに本の情報が表示されます')
    const [message, setValidMessage] = useState('ISBNを入力してください')

    const searchBook = () => {
        commonSearchBook(isbn).then(result => {
            if (result.err) {
                setBook(null)
                setSearchedMessage('該当するデータがみつかりませんでした')
                console.error(result.err)
            }
            else if (result.book) {
                setBook(result.book)
            }
        })
    }
    const changeIsbn = (e) => {
        // 空白ではないかつ数字の場合ISBNにset
        const onlyNumber = e.target.value.replace(/[^0-9]/g, '')
        setIsbn(onlyNumber)
        setValidMessage(Validation.formValidate('isbn', onlyNumber))
    }

    /**type="file"のinputタグのref */
    const fileInputRef = React.useRef(null)

    /**ファイル読み込み時のハンドラ */
    const handleChangeFile = files => {
        if (!files.length || !files[0] || !files[0].name.endsWith(".csv")) {
            alert("非対応のファイル形式")
            return
        }

        getArrayFromCsvFile(files[0], result => {
            if (result.err) {
                console.error(result.err)
            }
            else if (result.book) {
                console.debug(`"${result.book.title}"のデータを取得完了`)
                //ここでstate更新などすれば順次追加の表示ができる
            }
        }).then(books => {
            //デバッグコンソールに出力
            console.debug('書籍情報の一覧取得完了')
            console.debug(JSON.stringify(books, undefined, 1))
        })
    }

    let searchedBook = newBook ? (<Book book={newBook} />) : (searchedMsg)
    return (
        <div className="body">
            <CSVReader
                onDrop={handleChangeFile}
            />
            <div className="wrap">
                ISBN-
                <TextBox
                    name="isbn"
                    onChange={changeIsbn}
                    value={isbn} />
                {message && (
                    <p className="valid-message">{message}</p>
                )}
                <Button
                    color='primary'
                    variant='contained'
                    onClick={searchBook}
                    disabled={message.length !== 0}
                >検索</Button>
            </div>
            { searchedBook}
        </div >
    )
}

export default BookAddForm
