import React, { Component } from 'react';
import './App.css';
//import firebase from 'firebase/app';
//import firestore from 'firebase/firestore';
import { firebaseDb } from './firebase/index';
import axios from 'axios';

const collection = firebaseDb.collection('books');

const server = 'https://www.googleapis.com/books/v1/volumes?q=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], link: '', image: '', title: ''};
    this.isbn = this.isbn.bind(this);
    this.onAddBookInfo = this.onAddBookInfo.bind(this);
    this.onShowBookInfo = this.onShowBookInfo.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <header>書籍アプリ</header>
        <div className="container">
          <form onSubmit={this.onAddBookInfo}
                autoComplete="off">
            <input
              onChange={this.isbn}
              //value={this.isbn}
              id='isbn'
              placeholder="追加する書籍のISBN"
            /><br/>
            <button
              className="btn btn-success"
              type="submit"
            >追加
            </button>
          </form>
          <form onClick={this.onShowBookInfo}
                autoComplete="off">
            <button
              className="btn btn-success"
              type="submit"
            >書籍表示
            </button>
          </form>
          </div>
      　{/*  BookList Componentの呼び出し */}
        <div className="book-list">
          <BookList items={this.state.items} />
        </div>
      </React.Fragment>
    );
  }

  isbn(event) {
    this.setState({ isbn: event.target.value });
  }

  // 追加ボタン押下処理
  onAddBookInfo(event) {
    event.preventDefault();
    if(this.state.isbn === void 0) {
      alert('ISBNを入力してください')
      return;
    }
    // google books api実行
    axios.get(server + 'isbn:' + this.state.isbn)
      .then((res) => {
        // isbnのヒット件数は必ず1件のためループ処理は行わない

        if (res.data.items === void 0)
        {
          alert('取得に失敗しました。')
          return;     
        }
        //res.data.cou
        const newItem = {
          title: res.data.items[0].volumeInfo.title,
          image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
          link:  res.data.items[0].volumeInfo.previewLink
        };
        // DBへ追加(重複判定要調査)
        collection.add({
          title: res.data.items[0].volumeInfo.title,
          image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
          link:  res.data.items[0].volumeInfo.previewLink
        })
        .then((doc) => {
          console.log(`${doc.id}をDBに追加`);
        })
        .catch((error) => {
          console.log(error);
        });

        this.setState(state => ({
          items: state.items.concat(newItem),
        }));
        console.log(res);
      })
      .catch(console.error);
  }
  
  // 書籍表示ボタン押下処理
  onShowBookInfo(event) {
    event.preventDefault();

    // クリア
    this.state.items.splice(0);
    // DBから全てのデータ取得
    collection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const allItems = {
          title: doc.data().title,
          image: doc.data().image,
          link: doc.data().link,
        }
        this.setState(state => ({
          items: state.items.concat(allItems),
        }));
      });
    })
    .catch((error)=>{
      console.log(error);
    });
  }
}

class BookList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul>
          {this.props.items.map((item, i) => (
            <li key={i}>
            <div className="line-bc">
              <div className="balloon6">
                <div className="faceicon">
                  <a href={item.link}>
                  <img alt="test" src={item.image}/>
                  </a>
                    {item.title}
                </div>
              </div>
            </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default App;