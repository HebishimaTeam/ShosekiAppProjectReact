import React, { useState } from "react";
import { Button, Dialog } from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import CSVReader, { onDrop } from "../../atoms/CSVReader";
import { getArrayFromCsvFile } from "../../logics/file";
import { commonAxiosProc } from "../../logics/api";

const CSVAdd = (props) => {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const sanitized = books.filter(
      (book) => book.title !== undefined && book.title !== ""
    );
    commonAxiosProc("/addBookList", "post", sanitized)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error);
      });
  };

  /**
   * ファイル読み込み時のハンドラ
   * @type {onDrop}
   */
  const handleChangeFile = (files) => {
    if (!files.length || !files[0] || !files[0].name.endsWith(".csv")) {
      alert("非対応のファイル形式");
      return;
    }

    const buf = [];
    getArrayFromCsvFile(files[0], (result) => {
      if (result.err) {
        console.error(result.err);
      } else if (result.book) {
        console.debug(`"${result.book.title}"のデータを取得完了`);
      }
      //順次追加
      buf.push(result.book);
    }).then(() => {
      console.log("CSVからのデータ取得終了");
      setBooks(buf);
    });
  };
  return (
    <>
      <Button variant="contained" onClick={openModal}>
        まとめて追加
      </Button>
      <Dialog open={open} onClose={closeModal}>
        <div>
          <CSVReader onDrop={handleChangeFile} />
          {books.length > 0 && (
            <>
              <div>
                {books.map((book, index) => {
                  if (book.title) {
                    return <p key={index}>{book.title}</p>;
                  } else {
                    return (
                      <p
                        style={{ color: "red" }}
                        key={index}
                      >{`取得失敗 isbn:${book.isbn}`}</p>
                    );
                  }
                })}
              </div>
              <div
                style={{
                  alignSelf: "center",
                  textAlign: "-webkit-center",
                }}
              >
                <Button variant="contained" onClick={handleSubmit}>
                  確定
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default CSVAdd;
