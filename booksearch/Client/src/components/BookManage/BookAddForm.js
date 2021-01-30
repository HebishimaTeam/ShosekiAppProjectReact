import React, { useState } from "react";
import { Button, TextBox, Validation } from "../../atoms/index";
import { commonSearchBook } from "../../logics/api";
import { Book } from "./index";
import CSVAdd from "./CSVAddModal";
import axios from 'axios'

const BookAddForm = () => {
  const [isbn, setIsbn] = useState("");
  const [newBook, setBook] = useState(null);
  const [searchedMsg, setSearchedMessage] = useState(
    "ここに本の情報が表示されます"
  );
  const [message, setValidMessage] = useState("ISBNを入力してください");

  const searchBook = () => {
    commonSearchBook(isbn).then((result) => {
      if (result.err) {
        setBook(null);
        setSearchedMessage("該当するデータがみつかりませんでした");
        console.error(result.err);
      } else if (result.book) {
        setBook(result.book);
      }
    });
  };

  const addBook = () => {
     axios.post('/addBookInfo', {
        isbn: newBook.isbn,
        title: newBook.title,
        comment: newBook.comment,
        image: newBook.image,
        description: newBook.description
    }).then((res) => {
        // 追加成功
        alert('追加しました。')
    }).catch((error) => {
        console.error(error)
        alert('更新に失敗しました。管理者に問い合わせてください。')
    })
  };

  const changeIsbn = (e) => {
    // 空白ではないかつ数字の場合ISBNにset
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setIsbn(onlyNumber);
    setValidMessage(Validation.formValidate("isbn", onlyNumber));
  };

  let searchedBook = newBook ? <Book book={newBook} /> : searchedMsg;
  return (
    <div className="body">
      <CSVAdd  />
      <div className="wrap">
        ISBN-
        <TextBox name="isbn" onChange={changeIsbn} value={isbn} />
        
        <Button
          color="primary"
          variant="contained"
          onClick={searchBook}
          disabled={message.length !== 0}
          style={{
            marginRight: "10px"
        }}
        >
          検索
        </Button>

        <Button
          color="primary"
          variant="contained"
          onClick={addBook}
          disabled={newBook === null}
        >
          追加
        </Button>

        {message && <p className="valid-message">{message}</p>}

      </div>
      {searchedBook}
    </div>
  );
};

export default BookAddForm;
