import React from 'react'
import Button from '../../atoms/Button'
import Book from './Book'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import TextBox from '../../atoms/TextBox'

const BookSearchForm = () => {
    const [books, setBooks] = React.useState([])
    const history = useHistory()
    const navBarSearched = useSelector(state => state.book.searchBook);
    // const [bookTitle, setBookTitle] = React.useState("")
    const commonAxiosProc = (url) => {
        axios.get(url)
            .then(res => setBooks(res.data))
            .catch(error => alert(error))
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
    const showAddBookForm = (e) => {
        //書籍追加画面に遷移
        history.push('/BookAdd')
    }
    React.useEffect(() => commonAxiosProc('/getAllBookInfo'), [])

    //NavBarで検索処理が実行されたときにnavBarSearchedが書き換えられ、この処理が実行される
    // React.useEffect(() => {
    //     if (navBarSearched !== "") searchBook(navBarSearched)
    // }, [navBarSearched, searchBook])

    React.useEffect(() => {
        const searchBook = (title) => {
            if (title === "") {
                commonAxiosProc('/getAllBookInfo')
            } else {
                commonAxiosProc(`/getBookInfo?title=${title}`)
            }
        }
        searchBook(navBarSearched)
    }, [navBarSearched])

    // ToDo kanriFlg処理
    let kanriFlg = false
    kanriFlg = true

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
            {books.length !== 0 ? books.map((book, idx) => <Book book={book} key={idx.toString()} kanriFlg={kanriFlg} />) : <CircularProgress />}
        </div>
    )
}
export default BookSearchForm