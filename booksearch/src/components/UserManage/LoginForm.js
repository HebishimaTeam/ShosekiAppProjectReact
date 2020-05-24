import React, {Component} from 'react'

class LoginForm extends Component {
    onLogin = () => {
        this.props.history.push('/BookSearch')
    }

    render(){
        return(
            // <div>LoginForm</div>
            <div>
                <form onSubmit={this.onLogin}
                        autoComplete="off"
                        >
                    <button className="btnLogin"
                            type="submit">
                            ログイン
                    </button>
                </form>
            </div>
        )   
    }
}

export default LoginForm;