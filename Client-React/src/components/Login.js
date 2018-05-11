import React, { Component } from 'react';
import './Login.css';
import AuthService from './AuthService';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        Email: <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="email"
                            type="text"
                            onChange={this.handleChange}
                        />
                        Password: <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="Login"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.email,this.state.password)
            .then(res =>{
               localStorage.setItem('username', res.username);
               localStorage.setItem('zip', res.zip);
               localStorage.setItem('email', res.email);
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}

export default Login;