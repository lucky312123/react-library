
import React, { Component } from 'react';
import './App.css';
import LoginScreen from './LoginScreen';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      libraryScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen appContext={this} key={"login-screen"}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.libraryScreen}
      </div>
    );
  }
}

export default App;