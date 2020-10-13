import AuthenticationService from "./AuthenticationService";
import React, {Component} from "react";

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("authenticatedUser") || '',
            password: '',
            token: localStorage.getItem("token") || '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    };


    loginClicked = () => {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch( () =>{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password :  <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    };
}


export default LoginComponent;