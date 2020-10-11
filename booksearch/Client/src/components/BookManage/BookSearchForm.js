import React from 'react'
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import Book from "./Book";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

const BookSearchForm = () => {
    const [bookTitle, setBookTitle] = React.useState("");
    const [books, setBooks] = React.useState([]);
    const history = useHistory();
    const commonAxiosProc = (url) => {
        axios.get(url)
            .then(res => setBooks(res.data))
            .catch(error => alert(error));
    }
    const onTextboxChanged = (e) => setBookTitle(e.target.value);
    const onSearchBtnClicked = (e) => {
        e.preventDefault();
        if (bookTitle === "") {
            commonAxiosProc('/getAllBookInfo');
        } else {
            commonAxiosProc(`/getBookInfo?title=${bookTitle}`)
        }
    }
    const showAddBookForm = (e) => {
        //書籍追加画面に遷移
        history.push('/BookAdd');
    }
    React.useEffect(() => commonAxiosProc('/getAllBookInfo'), []);
    return (
        <React.Fragment>
            <div className="wrap">
                <div>BookSearchForm</div>
                <TextBox
                    onChange={onTextboxChanged}
                    value={bookTitle} />
                <Button
                    variant="contained"
                    onClick={onSearchBtnClicked}
                >検索 </Button>
                <Button
                    variant="contained"
                    onClick={showAddBookForm}
                >書籍追加</Button>
            </div>
            {books.length !== 0 ? books.map(book => <Book book={book} />) : <CircularProgress />}
        </React.Fragment>
    )
}
export default BookSearchForm;