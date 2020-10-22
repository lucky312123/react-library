
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import {apiUrl} from "./Component/Url";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
  }
  handleClick(event, role) {
    var apiBaseUrl = apiUrl+"users";

    var self = this;

    if (this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.email.length > 0 && this.state.password.length > 0) {
      var payload = {

        "email": this.state.email,
        "password": this.state.password,
        "firstName": this.state.first_name,
        "lastName": this.state.last_name

      }

      axios.post(apiBaseUrl, payload)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            //  console.log("registration successfull");
            var loginscreen = [];
            loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role} />);
            var loginmessage = "Zarejestrowano!";
            self.props.parentContext.setState({
              loginscreen: loginscreen,
              loginmessage: loginmessage,
              buttonLabel: "Register",
              isLogin: true
            });
          }
          else {
            console.log("some error ocurred", response.data.code);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("Wypełnij wszystkie pola!");
    }

  }

  render() {
    // console.log("props",this.props);
    var userhintText, userLabel;
    if (this.props.role === "użytkownik") {
      userhintText = "Podaj swój email";
      userLabel = "Email";
    }
    else {
      userhintText = "Podaj swój email";
      userLabel = "Email";
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Rejestracja"
            />
            <TextField
              hintText="Podaj imię"
              floatingLabelText="Imię"
              onChange={(event, newValue) => this.setState({ first_name: newValue })}
            />
            <br />
            <TextField
              hintText="Podaj nazwisko"
              floatingLabelText="Nazwisko"
              onChange={(event, newValue) => this.setState({ last_name: newValue })}
            />
            <br />
            <TextField
              hintText={userhintText}
              floatingLabelText={userLabel}
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Podaj hasło"
              floatingLabelText="Hasło"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Zarejestruj" primary={true} style={style} onClick={(event) => this.handleClick(event, this.props.role)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;