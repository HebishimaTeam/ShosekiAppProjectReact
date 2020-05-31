import React, {Component} from 'react'
import Button from '../../atoms/Button';

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
                    <Button className="btnLogin"
                            type="submit"
                            variant="contained">
                            ログイン
                    </Button>
                </form>
            </div>
        )   
    }
}

export default LoginForm;