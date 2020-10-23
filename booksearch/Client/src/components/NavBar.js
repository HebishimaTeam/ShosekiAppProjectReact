import React, { useState } from 'react'
import { AppBar, Toolbar, InputBase } from '@material-ui/core'
import BookIcon from '@material-ui/icons/MenuBook'
import SearchIcon from '@material-ui/icons/Search'
import { withRouter } from 'react-router'
import '../styles.css'
import { useSelector, useDispatch } from "react-redux";
import { SOME_ACTION } from "../redux/session";

const NavBar = (props) => {
    //reduxのsession sliceのsearchBookオブジェクトを呼び出し
    const searchBook = useSelector(state => state.session.searchBook)
    //reduxにデータを送るための関数を作成
    const dispatch = useDispatch()
    const [book, setBook] = useState('')
    return (
        <AppBar position="static">
            <Toolbar>
                <BookIcon onClick={() => props.history.push('/')}></BookIcon>
                <div>
                    <div>
                        {/* 虫眼鏡をクリックするとsession sliceのSOME_ACTIONというactionを実行 */}
                        <SearchIcon onClick={() => { dispatch(SOME_ACTION(book)) }} />
                        {`searchedBook:${searchBook}`}
                    </div>
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => { setBook(e.target.value) }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(NavBar)