import React, { Component } from 'react'
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import Book from "./Book";
import axios from 'axios';

class BookSearchForm extends Component {
    constructor() {
        super();
        this.state = {
            booktitle: '',
            books: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //検索ボタンを押した後の処理
        axios.get(`/getBookInfo?title=${this.state.booktitle}`)
            .then(res => {
                //成功時の処理を書く
                this.setState({
                    // books: res.data
                    books: [{
                        title: "リーダブルコード",
                        image: "data:image/jpeg;base64,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",
                        comment: "リーダブルコードのコメントだよー。"
                    }]
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { booktitle, books } = this.state;
        let searchedBooks = books ? books.map(book => <Book book={book} />)
            : (<p>タイトルを入力して検索ボタンを押してください</p>)
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