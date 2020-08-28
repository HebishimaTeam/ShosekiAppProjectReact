import React, { Component } from 'react'
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import axios from 'axios';
import Book from "./Book";


const googleBooksApi = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

export class BookAddForm extends Component {
    constructor() {
        super();
        this.state = {
            isbn: null,
            newBook: null
        }
    }
    searchBook = (e) => {
        e.preventDefault();
        //Googl Books Apiを検索
        axios.get(`${googleBooksApi}${this.state.isbn}`)
            .then(res => {
                //成功パターン
                const newBook = {
                    title: res.data.items[0].volumeInfo.title,
                    image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
                    link: res.data.items[0].volumeInfo.previwLink
                }
                this.setState({ newBook })
            })
            .catch(err => {
                //検索失敗
                console.error(err);
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { newBook, isbn } = this.state;
        let searchBook = newBook ? (<Book book={newBook} />) : (<p>この本の情報が表示されます</p>)
        return (
            <div>
                <TextBox name="isbn"
                    onChange={this.handleChange}
                    value={isbn}></TextBox>
                <Button variant="contained"
                    onClick={this.searchBook} >検索</Button>
                {searchBook}
            </div>
        )
    }
}

export default BookAddForm
