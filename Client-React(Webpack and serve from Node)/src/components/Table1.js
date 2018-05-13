import React, { Component } from 'react';
import AuthService from './AuthService';
const Auth = new AuthService(); 
 
var tableStyle = {
  margin: "auto",
  border: "3px solid #b25107"
};
var trHStyle = {
  backgroundColor: '#F4A460'
};
var trDStyle = {
  backgroundColor: '#e5e2d7'
};

class Table1 extends Component {
  constructor(props){
    super(props);
    this.state = {apiData: []};
  }

  componentDidMount() {
    Auth.getTableData().then(res => {
      this.setState({apiData: res.items});
    });
  }

  render() {
    if (this.state.apiData === undefined) {
      return null;
    } else {
      return (
        <div>
          <table style={tableStyle}>
            <thead>
                <tr style={trHStyle}>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Task</th>
                </tr>
            </thead>
            <tbody>
            {this.state.apiData.map((data, key) => {
                return (
                <tr key={key} style={trDStyle}>
                  <td>{data.volumeInfo.title}</td>
                  <td>{data.volumeInfo.authors[0]}</td>
                  <td>{data.volumeInfo.publisher}</td>
                </tr>
                )
            })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
 
export default Table1;