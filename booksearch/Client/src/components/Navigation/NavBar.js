import React, { useState } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import BookIcon from '@material-ui/icons/MenuBook'
import { withRouter } from 'react-router'
import '../../styles.css'
import { useSelector, useDispatch } from "react-redux";
import { SOME_ACTION ,authenticated} from "../../redux/Slices/session/session";
import SearchField from "./SearchField";

const NavBar = (props) => {
    //reduxのsession sliceの状態オブジェクトから、searchBookプロパティを呼び出し
    const searchBook = useSelector(state => state.session.searchBook)
    //reduxにデータを送るための関数を作成
    const dispatch = useDispatch()
    const [book, setBook] = useState('')
    return (
        <AppBar position="static" style={{ flexGrow: true }}>
            <Toolbar style={{ alignItems: "center" }}>
                <BookIcon onClick={() => props.history.push('/')}></BookIcon>
                <div style={{ display: 'flex' }}>
                    <div style={{ padding: "auto" }}>
                        {/* Enterするとsession sliceのSOME_ACTIONというactionを実行 */}
                        <SearchField
                            onChange={(e) => { setBook(e.target.value) }}
                            onSubmit={() => { dispatch(SOME_ACTION(book)) }}
                        />
                    </div>
                    <div style={{ marginBottom: "auto", marginTop: "auto" }}>
                        {`検索文字列:${searchBook}`}
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(NavBar)