import React, { useState, useEffect } from 'react'
import { Button } from '../../atoms/index'
import { Book } from './index'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import functions from 'firebase-functions'

// ToDo セッションから取得
const BookSearchForm = () => {
    const isAdmin = useSelector(state => state.session.isAdmin)
    const [books, setBooks] = useState([])
    const [searchedMsg, setSearchedMessage] = useState('ここに本の表示がされます')
    const history = useHistory()
    const navBarSearched = useSelector(state => state.book.searchBook);

    const showAddBookForm = (e) => {
        //書籍追加画面に遷移
        history.push('/BookAdd')
    }
    const commonAxiosProc = (url) => {
        const env = process.env.REACT_APP_ENV
        if (process.env.REACT_APP_ENV === 'emu') {
            url = `http://localhost:5001/shosekiappproject/us-central1/api${url}`
        } 
        axios.get(url)
            .then(res => {
                setBooks(res.data)
                if (res.data.length === 0) setSearchedMessage('該当する本はありません')
            },
            ).catch(error => {
                alert(error)
            })
    }

    useEffect(() => commonAxiosProc('/getAllBookInfo'), [])

    useEffect(() => {
        const searchBook = (title) => {
            if (title === "") {
                commonAxiosProc('/getAllBookInfo')
            } else {
                commonAxiosProc(`/getBookInfo?title=${title}`)
            }
        }
        searchBook(navBarSearched)
    }, [navBarSearched])

    return (
        <div className="body">
            <div className="wrap">
                <div>BookSearchForm</div>
                {isAdmin &&
                    (<Button
                        variant="contained"
                        onClick={showAddBookForm}
                    >書籍追加
                    </Button>)}
            </div>
            {books.length !== 0 ? books.map((book, idx) => <Book book={book} key={idx.toString()} />) : searchedMsg}
        </div>
    )
}

export default BookSearchForm