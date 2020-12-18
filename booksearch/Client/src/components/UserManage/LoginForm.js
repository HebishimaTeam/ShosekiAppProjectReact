import React, { useState } from 'react'
import { Button, TextBox, Validation } from '../../atoms/index'
import { CircularProgress, Grid } from '@material-ui/core'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/Slices/session/session'

const LoginForm = (props) => {

  const [info, setInfo] = useState({
    mail: '',
    password: ''
  })
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
  const canSubmit = () => {
    const validInfo =
      // 全ての値が空文字以外でないとtrueにならない
      Object.values(info).filter((value) => {
        return value === ''
      }).length === 0

    const validMessage =
      // 全ての値が空文字でないとtrueにならない
      Object.values(message).filter((value) => {
        return value !== ''
      }).length === 0

    return (validInfo && validMessage && !loading)
  }
  const onLogin = (event) => {
    event.preventDefault()
    setLoading(true)
    axios.post('/login', info)
      .then((res) => {
        setLoading(false) //ぐるぐるが終わる
        if (
          res.data?.result?.isAdmin !== true &&
          res.data?.result?.isAdmin !== false
        ) {
          throw new Error("データ取得失敗");
        }
        // アクションを発行してログインフラグを立てる
        dispatch(login({ isAdmin: res.data.result.isAdmin }));
      },
      ).catch((error) => {
        console.error(error)
        if (error instanceof Error) {
          setErrors(error.message);
        } else {
          setErrors(error.response.data);
        }
        console.debug(errors)
        setLoading(false)
        alert('ログインエラーです')
      })
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
        <Grid item xs>
          <TextBox label="mail"
            name="mail"
            value={info.mail}
            onChange={handleChange} />
          {message.mail && (
            <p className="valid-message">{message.mail}</p>
          )}
        </Grid>
        <Grid item xs>
          <TextBox label="password"
            name="password"
            value={info.password}
            onChange={handleChange}
            type='password' />
          {message.password && (
            <p className="valid-message">{message.password}</p>
          )}
        </Grid>
        <Grid item xs>
          <Button
            color='primary'
            variant='contained'
            onClick={onLogin}
            disabled={!canSubmit()}
          >
            ログイン
              {loading && (<CircularProgress />)}
          </Button>
        </Grid>
      </Grid >
      <Grid item sm />
    </Grid >
  )
}

export default LoginForm