import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import Table1 from './components/Table1';
const Auth = new AuthService();

class App extends Component {
 
    constructor(){
        super();
        this.state = {
          isLoggedIn: false,
          username: "",
          zip: "",
          email: ""
        };
    }

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  getTableData(){
    this.setState({isLoggedIn: true});
  }

  componentDidMount() {
    let res = Auth.getProfileData();
    this.setState({isLoggedIn: false, username: res.username, zip: res.zip, email: res.email});
  }

  render() {
    var tableComponent;
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {      
      tableComponent = <div><p className="Table-header">Table</p><Table1 /></div>;
    } else {
      tableComponent = <div />;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>{this.state.username} Details</h2>
          <p className="App-intro">
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
          </p>
        </div>
        <br />

        <p>
          Username: <input type = "text" value = {this.state.username} />
        </p>
        <p>
          Address(Zip): <input type = "text" value = {this.state.zip} />
        </p>
        <p>
          Email: <input type = "text" value = {this.state.email} />
        </p>
        <br />

        <p className="App-intro">
          <button type="button" className="form-submit" onClick={this.getTableData.bind(this)}>Reading Preference</button>
        </p>        
        <div className="App" >          
          {tableComponent}
        </div>
      </div>
    );
  }
}

export default withAuth(App);
