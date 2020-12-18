import React, { useState } from "react";
import { Button, TextBox, Validation } from "../../atoms/index";
import { commonSearchBook } from "../../logics/api";
import { Book } from "./index";
import CSVAdd from "./CSVAddModal";

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
        {message && <p className="valid-message">{message}</p>}
        <Button
          color="primary"
          variant="contained"
          onClick={searchBook}
          disabled={message.length !== 0}
        >
          検索
        </Button>
      </div>
      {searchedBook}
    </div>
  );
};

export default BookAddForm;
