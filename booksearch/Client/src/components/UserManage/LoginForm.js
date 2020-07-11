import React, { Component } from 'react'
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoginForm extends Component {
    constructor(props, context) {
        super()
        this.state = {
            mail: '',
            password: '',
            errors:{},
            loading: false
        }
    }

    onLogin = (event) => {
        event.preventDefault();
            this.setState({loading:true})
        axios.post('/login', this.state)
            .then((res) => {
                this.setState({loading:false})
                //APIにthis.stateのmailとパスワード
                this.props.history.push('/BookSearch')
            },
            ).catch((error) => {
                console.error(error);
                this.setState({
                    errors:error.response.data,
                    loading:false,
                })
                alert('ログインエラーです');
            }
            );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const {loading}=this.state;
        return (
            <Grid container >
                <Grid item xs />
                <Grid item xs>
                    <form onSubmit={this.onLogin}
                        autoComplete="off">
                        <Grid item xs>
                            <TextBox label="mail"
                                name="mail"
                                value={this.state.mail}
                                onChange={this.handleChange}>
                            </TextBox>
                        </Grid>
                        <Grid item xs>
                            <TextBox label="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                type='password'>
                            </TextBox>
                        </Grid>
                        <Grid item xs>
                            <Button className="btnLogin"
                                type="submit"
                                variant="contained">
                                ログイン
                                {loading&&(<CircularProgress />)}
                            </Button>
                        </Grid>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid >
        )
    }
}

export default LoginForm;