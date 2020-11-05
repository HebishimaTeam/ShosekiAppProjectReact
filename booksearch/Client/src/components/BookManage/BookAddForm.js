import React, { useState } from 'react'
import { Button, TextBox } from '../../atoms/index'
import { Book } from './index'
import axios from 'axios'

const openbdApi = 'https://api.openbd.jp/v1/get?isbn='

const BookAddForm = () => {

    const [isbn, setIsbn] = useState('')
    const [newBook, setBook] = useState(null)
    const [searchedMsg, setSearchedMessage] = useState('ここに本の情報が表示されます')

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
        // const re = /^[0-9\b]+$/
        // 空白ではないかつ数字のみISBNにset
        // if (re.test(e.target.value))
        setIsbn(e.target.value)
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
                <Button
                    color='primary'
                    variant='contained'
                    onClick={searchBook}
                    disabled={isbn.length < 10 || 13 < isbn.length}
                >検索</Button>
            </div>
            {searchedBook}
        </div>
    )
}

export default BookAddForm
