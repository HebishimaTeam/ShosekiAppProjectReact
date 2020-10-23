import React, { useState } from 'react'
import { AppBar, Toolbar, InputBase } from '@material-ui/core'
import BookIcon from '@material-ui/icons/MenuBook'
import SearchIcon from '@material-ui/icons/Search'
import { withRouter } from 'react-router'
import '../styles.css'
import { useSelector, useDispatch } from "react-redux";
import { SOME_ACTION } from "../redux/session";

const NavBar = (props) => {
    const searchBook = useSelector(state => state.session.searchBook)
    const dispatch = useDispatch()
    const [book, setBook] = useState('')
    return (
        <AppBar position="static">
            <Toolbar>
                <BookIcon onClick={() => props.history.push('/')}></BookIcon>
                <div>
                    <div>
                        {/* 虫眼鏡をクリックするとSOME_ACTION */}
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