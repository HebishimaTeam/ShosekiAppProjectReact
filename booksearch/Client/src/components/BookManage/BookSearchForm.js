import React, { useState, useEffect } from 'react'
import { Button } from '../../atoms/index'
import { Book } from './index'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import TextBox from '../../atoms/TextBox'
// import CircularProgress from '@material-ui/core/CircularProgress'

// ToDo セッションから取得
let kanriFlg = false
kanriFlg = true

const BookSearchForm = () => {

    const [books, setBooks] = useState([])
    const [searchedMsg, setSearchedMessage] = useState('ここに本の表示がされます')
    const history = useHistory()
    const navBarSearched = useSelector(state => state.book.searchBook);
    // const [bookTitle, setBookTitle] = React.useState("")

    const showAddBookForm = (e) => {
        //書籍追加画面に遷移
        history.push('/BookAdd')
    }
    const commonAxiosProc = (url) => {
        axios.get(url)
            .then(res => {
                setBooks(res.data)
                if (res.data.length === 0) setSearchedMessage('該当する本はありません')
            },
            ).catch(error => {
                alert(error)
            })
    }

    // const searchBook = (title) => {
    //     if (title === "") {
    //         commonAxiosProc('/getAllBookInfo')
    //     } else {
    //         commonAxiosProc(`/getBookInfo?title=${title}`)
    //     }
    // }
    // const onSearchBtnClicked = (e) => {
    //     //画面内のタイトルで検索
    //     searchBook(bookTitle)
    // }
    useEffect(() => commonAxiosProc('/getAllBookInfo'), [])

    //NavBarで検索処理が実行されたときにnavBarSearchedが書き換えられ、この処理が実行される
    // useEffect(() => {
    //     if (navBarSearched !== "") searchBook(navBarSearched)
    // }, [navBarSearched, searchBook])
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
                {kanriFlg &&
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