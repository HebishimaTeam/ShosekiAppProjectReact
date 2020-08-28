import React, { Component } from 'react'
import Button from '../../atoms/Button'
import TextBox from '../../atoms/TextBox'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Validation from '../../atoms/Validation.js'

class LoginForm extends Component {
  constructor(props, context) {
    super()
    this.state = {
      info: {
        mail: '',
        password: ''
      },
      message: {
        mail: '',
        password: ''
      },
      errors: {},
      loading: false
    }
  }

  handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    const { info, message } = this.state
    this.setState({
      info: {
        ...info,
        [key]: value
      },
      message: {
        ...message,
        [key]: Validation.formValidate(key, value)
      }
    })
  }

  onLogin = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    axios.post('/login', this.state.info)
      .then((res) => {
        this.setState({ loading: false }) //ぐるぐるが終わる
        //APIにthis.stateのinfo
        this.props.history.push('/BookSearch')
      },
      ).catch((error) => {
        console.error(error)
        this.setState({
          errors: error.response.data,
          loading: false
        })
        alert('ログインエラーです')
      }
      )
  }

  render() {
    const { info, loading, message } = this.state
    return (
      <Grid container >
        <Grid item xs />
        <Grid item xs>
          <form onSubmit={this.onLogin}
            autoComplete="off">
            <Grid item xs>
              <TextBox label="mail"
                name="mail"
                value={info.mail}
                onChange={this.handleChange}>
              </TextBox>
              {message.mail && (
                <p style={{ color: 'red', fontSize: 8 }}>{message.mail}</p>
              )}
            </Grid>
            <Grid item xs>
              <TextBox label="password"
                name="password"
                value={info.password}
                onChange={this.handleChange}
                type='password'>
              </TextBox>
              {message.password && (
                <p style={{ color: 'red', fontSize: 8 }}>{message.password}</p>
              )}
            </Grid>
            <Grid item xs>
              <Button className="btnLogin"
                type="submit"
                variant="contained"
              >
                ログイン
              {loading && (<CircularProgress />)}
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item sm />
      </Grid >
    )
  }
}

export default LoginForm