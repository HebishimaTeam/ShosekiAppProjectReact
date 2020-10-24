import React, { useState } from 'react'
import Button from '../../atoms/Button'
import TextBox from '../../atoms/TextBox'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Validation from '../../atoms/Validation.js'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/session/session";

const LoginForm = (props) => {

  const [info, setInfo] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const isAuthorized = useSelector(state => state.session.isAuthorized)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    setInfo({ ...info, [key]: value })
    setMessage({
      ...message,
      [key]: Validation.formValidate(key, value)
    })
  }

  const onLogin = (event) => {
    event.preventDefault()
    setLoading(true)
    axios.post('/login', info)
      .then((res) => {
        setLoading(false) //ぐるぐるが終わる
        // アクションを発行してログインフラグを立てる
        dispatch(login())
      },
      ).catch((error) => {
        console.error(error)
        setErrors(error.response.data)
        console.debug(errors)
        setLoading(false)
        alert('ログインエラーです')
      }
      )
  }

  React.useEffect(() => {
    //ログイン状態が変化したとき、ログイン済である場合
    if (isAuthorized)
      //検索画面に遷移
      props.history.push('/BookSearch')
  }, [isAuthorized, props.history])

  return (
    <Grid container >
      <Grid item xs />
      <Grid item xs>
        <form onSubmit={onLogin}
          autoComplete="off">
          <Grid item xs>
            <TextBox label="mail"
              name="mail"
              value={info.mail}
              onChange={handleChange}>
            </TextBox>
            {message.mail && (
              <p style={{ color: 'red', fontSize: 8 }}>{message.mail}</p>
            )}
          </Grid>
          <Grid item xs>
            <TextBox label="password"
              name="password"
              value={info.password}
              onChange={handleChange}
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

export default LoginForm