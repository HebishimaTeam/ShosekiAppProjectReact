import React, { useState, useEffect } from 'react'
import { Button } from '../../atoms/index'
import { Book } from './index'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { commonAxiosProc } from "../../logics/api";

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
    
    /**@param {string} url */
    const commonSearchProc = (url) => {
        commonAxiosProc(url).then(res => {
            setBooks(res.data)
            if (res.data.length === 0) setSearchedMessage('該当する本はありません')
        }).catch((error) => {
            alert(error);
        });
    }

    useEffect(() => commonSearchProc('/getAllBookInfo'), [])

    useEffect(() => {
        const searchBook = (title) => {
            if (title === "") {
                commonSearchProc('/getAllBookInfo')
            } else {
                commonSearchProc(`/getBookInfo?title=${title}`)
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