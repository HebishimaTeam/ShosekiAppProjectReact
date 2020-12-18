import React, { useState } from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import BookIcon from '@material-ui/icons/MenuBook'
import { withRouter } from 'react-router'
import '../../styles.css'
import { useDispatch } from "react-redux";
import { searchBook } from "../../redux/Slices/book/book";
import { logout } from "../../redux/Slices/session/session";
import SearchField from "./SearchField";

const NavBar = (props) => {
  //reduxにデータを送るための関数を作成
  const dispatch = useDispatch();
  const [book, setBook] = useState("");

  const handleSubmit = () => {
    dispatch(searchBook(book));
    props.history.push("/BookSearch");
  };

  // TODO: cssをインラインで書いてしまっているので.cssファイルに変更する
  return (
    <AppBar position="static" style={{ flexGrow: true }}>
      <Toolbar style={{ alignItems: "center" }}>
        <BookIcon onClick={() => props.history.push("/")}></BookIcon>
        <div style={{ display: "inline-flex", width: "100%" }}>
          <div style={{ padding: "auto" }}>
            {/* Enterするとbook sliceのsearchBookというactionを実行 */}
            <SearchField
              onChange={(e) => {
                setBook(e.target.value);
              }}
              onSubmit={handleSubmit}
            />
          </div>
          <Button
            style={{
              marginBottom: "auto",
              marginTop: "auto",
              marginLeft: "auto",
              marginRight: "5px",
            }}
            variant="contained"
            onClick={() => {
              dispatch(logout());
            }}
          >
            ログアウト
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(NavBar)