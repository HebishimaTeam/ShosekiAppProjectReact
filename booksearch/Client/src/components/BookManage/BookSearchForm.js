import React, { Component } from 'react'
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import Book from "./Book";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

class BookSearchForm extends Component {
    constructor() {
        super();
        this.state = {
            booktitle: '',
            books: null
        }
    }

    componentDidMount = () => {
        axios.get('/getAllBookInfo')
            .then(res => {
                //成功パターン
                this.setState({
                    books: res.data
                })

            })
            .catch(error => {
                //失敗パターン
                alert(error);
            })
    }

    //検索ボタンをクリックした時の処理
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.booktitle === '') {
            axios.get('/getAllBookInfo')
                .then(res => {
                    //成功パターン
                    this.setState({
                        books: res.data
                    })

                })
                .catch(error => {
                    //失敗パターン
                    alert(error);
                })
        } else {
            axios.get(`/getBookInfo?title=${this.state.booktitle}`)
                .then(res => {
                    this.setState({
                        books: res.data
                    })
                })
                .catch(error => {
                    alert(error);
                })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { booktitle, books } = this.state;
        let searchedBooks = books ? books.map(book => <Book book={book} />)
            : (<div><CircularProgress /></div>)
        return (
            <div><div>BookSearchForm</div>
                <form onSubmit={this.handleSubmit}>
                    <TextBox label="本のタイトル"
                        name="booktitle"
                        onChange={this.handleChange}
                        value={booktitle}
                    >
                    </TextBox>
                    <Button className="btnSearch"
                        type="submit"
                        variant="contained">
                        検索 </Button>
                    {searchedBooks}
                </form>
            </div>
        )
    }
}
export default BookSearchForm;