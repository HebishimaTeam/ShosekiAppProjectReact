import React, { Component } from 'react';
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import axios from 'axios';
import Book from './Book';

const openbdApi = 'https://api.openbd.jp/v1/get?isbn=';
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
        //google Books APiを検索
        axios.get(`${openbdApi}${this.state.isbn}&pretty`)
            .then(res => {
                //検索成功パターン
                const newBook = {
                    title: res.data[0].summary.title,
                    image: res.data[0].summary.cover,
                    comment: res.data[0].onix.CollateralDetail.TextContent[0].Text
                }


                this.setState({ newBook });
            })
            .catch(err => {
                //検索失敗
                console.error(err);
            })
    }

    handleChange = (e) => {
        //テキストボックスに入力されたISBNコードを、stateのbooktitleにsetしたい
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { newBook, isbn } = this.state;
        let searchedBook = newBook ? (<Book book={newBook} />) : (<p>ここ本の情報が表示されます。</p>)
        return (
            <div>
                <TextBox
                    name="isbn"
                    onChange={this.handleChange}
                    value={isbn}></TextBox>
                <Button
                    variant="contains"
                    onClick={this.searchBook}
                >検索</Button>
                {searchedBook}
            </div>
        )
    }
}

export default BookAddForm
