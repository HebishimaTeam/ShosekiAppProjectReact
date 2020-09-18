import React from 'react'
import { AppBar, Toolbar,InputBase } from '@material-ui/core'
import BookIcon from '@material-ui/icons/MenuBook'
import SearchIcon from '@material-ui/icons/Search'
import { withRouter } from 'react-router';
import axios from 'axios';

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            books: null
        }
    }

    //検索ボタンをクリックした時の処理
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.booktitle === '') {
            axios.get('/getAllBookInfo')
                .then(res => {
                    //成功パターン
                    this.setState({
                        books: res.data
                    })

                })
                .catch(error => {
                    //失敗パターン
                    alert(error);
                })
        } else {
            axios.get(`/getBookInfo?title=${this.state.booktitle}`)
                .then(res => {
                    this.setState({
                        books: res.data
                    })
                })
                .catch(error => {
                    alert(error);
                })
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <BookIcon onClick={()=>this.props.history.push('/')}></BookIcon>
                    <div>
                        <div>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onSubmit={()=>this.handleSubmit()}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(NavBar);