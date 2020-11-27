import React, { useState } from 'react'
import { Button, TextBox, Validation } from '../../atoms/index'
import { Book } from './index'
import axios from 'axios'

const openbdApi = 'https://api.openbd.jp/v1/get?isbn='

const BookAddForm = () => {

    const [isbn, setIsbn] = useState('')
    const [newBook, setBook] = useState(null)
    const [searchedMsg, setSearchedMessage] = useState('ここに本の情報が表示されます')
    const [message, setValidMessage] = useState('ISBNを入力してください')

    const searchBook = () => {
        //google Books APiを検索
        axios.get(`${openbdApi}${isbn}&pretty`)
            .then(res => {
                //検索成功パターン
                const newBook = {
                    isbn: res.data[0].summary.isbn,
                    title: res.data[0].summary.title,
                    image: res.data[0].summary.cover,
                    comment: res.data[0].onix.CollateralDetail.TextContent[0].Text
                }
                setBook(newBook)
            })
            .catch(err => {
                //検索失敗
                setBook(null)
                setSearchedMessage('該当するデータがみつかりませんでした')
                console.error(err)
            })
    }
    const changeIsbn = (e) => {
        // 空白ではないかつ数字の場合ISBNにset
        const onlyNumber = e.target.value.replace(/[^0-9]/g, '')
        setIsbn(onlyNumber)
        setValidMessage(Validation.formValidate('isbn', onlyNumber))
    }

/**ファイル読み込み時のハンドラ */
    const handleChangeFile = e => {
        if (!e.target.files.length || !e.target.files[0] || !e.target.files[0].name.endsWith(".json")) {
            alert("非対応のファイル形式")
            return
        }

        let reader = new FileReader();

        reader.readAsText(e.target.files[0])

        reader.addEventListener('load', () => {
            const text = JSON.parse(reader.result)
            console.log(text);
        })
    }

    let searchedBook = newBook ? (<Book book={newBook} />) : (searchedMsg)
    return (
        <div className="body">
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
            <div>
                <p>まとめて追加！</p>
                <input type="file" onChange={handleChangeFile} />
            </div>
        </div >
    )
}

export default BookAddForm
