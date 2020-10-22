import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {apiUrl} from "./Component/Url";
import axios from 'axios';
import Library from './Library';

var apiBaseUrl = apiUrl + "authenticate/usertoken";

class Login extends Component {
    constructor(props) {
        super(props);
        var localloginComponent = [];
        localloginComponent.push(
            <MuiThemeProvider key={"theme"}>
                <div>
                    <TextField
                        hintText="Podaj swój email"
                        floatingLabelText="Email"
                        onChange={(event, newValue) => this.setState({username: newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Podaj hasło"
                        floatingLabelText="Hasło"
                        onChange={(event, newValue) => this.setState({password: newValue})}
                    />
                    <br/>
                    <RaisedButton label="Zaloguj" primary={true} style={style}
                                  onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
        )
        this.state = {
            username: '',
            password: '',
            menuValue: 1,
            loginComponent: localloginComponent,
            loginRole: 'użytkownik'
        }
    }

    componentWillMount() {
        // console.log("willmount prop values",this.props);
        if (this.props.role !== undefined) {
            if (this.props.role === 'użytkownik') {
                console.log("in student componentWillMount");
                var localloginComponent = [];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                hintText="Podaj swój email"
                                floatingLabelText="Email"
                                onChange={(event, newValue) => this.setState({username: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Podaj hasło"
                                floatingLabelText="Hasło"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Zaloguj" primary={true} style={style}
                                          onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({menuValue: 1, loginComponent: localloginComponent, loginRole: 'użytkownik'})
            } else if (this.props.role === 'bibliotekarz') {
                console.log("in teacher componentWillMount");
                var localloginComponent = [];
                localloginComponent.push(
                    <MuiThemeProvider>
                        <div>
                            <TextField
                                hintText="Podaj swój email"
                                floatingLabelText="Email"
                                onChange={(event, newValue) => this.setState({username: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Podaj hasło"
                                floatingLabelText="Hasło"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Zaloguj" primary={true} style={style}
                                          onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                )
                this.setState({menuValue: 2, loginComponent: localloginComponent, loginRole: 'bibliotekarz'})
            }
        }
    }

    handleClick(event) {
        // var self = this;
        // var libraryScreen = [];
        // libraryScreen.push(<Library appContext={self.props.appContext}/>)
        // self.props.appContext.setState({loginPage: [], libraryScreen: libraryScreen})

          var self = this;
          var libraryScreen = [];

          if (this.state.username.length > 0 && this.state.password.length > 0) {
            var payload = {
              "username": this.state.username,
              "password": this.state.password,

          }
          axios.post(apiBaseUrl, payload)
            .then(function (response) {
              console.log(response);
              if (response.status === 200) {
                console.log("Login successfull");

                libraryScreen.push(<Library appContext={self.props.appContext} role={response.data.role} token ={response.data.token} firstName = {response.data.firstName}
                                            lastName = {response.data.lastName} numBorrowed = {response.data.numBorrowed} cashPenalty = {response.data.cashPenalty} email = {response.data.email}
                />)
                self.props.appContext.setState({ loginPage: [], libraryScreen: libraryScreen })

                  } else if (response.status === 204) {
                    console.log("Username password do not match");
                    alert(response.data.success)
                  }  else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  if (error.response.status === 401) {
                    alert("Błędne dane")
                  }
                });
          }
          else {
            alert("Podaj poprawne dane");
        }

    }


    // handleMenuChange(value) {
    //   console.log("menuvalue", value);
    //   var loginRole;
    //   if (value == 1) {
    //     var localloginComponent = [];
    //     loginRole = 'użytkownik';
    //     localloginComponent.push(
    //       <MuiThemeProvider>
    //         <div>
    //           <TextField
    //             hintText="Podaj swój email"
    //             floatingLabelText="Email"
    //             onChange={(event, newValue) => this.setState({ username: newValue })}
    //           />
    //           <br />
    //           <TextField
    //             type="password"
    //             hintText="Podaj hasło"
    //             floatingLabelText="Hasło"
    //             onChange={(event, newValue) => this.setState({ password: newValue })}
    //           />
    //           <br />
    //           <RaisedButton label="Zaloguj" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
    //         </div>
    //       </MuiThemeProvider>
    //     )
    //   }
    //   else if (value == 2) {
    //     var localloginComponent = [];
    //     loginRole = 'bibliotekarz';
    //     localloginComponent.push(
    //       <MuiThemeProvider>
    //         <div>
    //           <TextField
    //             hintText="Podaj swój email"
    //             floatingLabelText="Email"
    //             onChange={(event, newValue) => this.setState({ username: newValue })}
    //           />
    //           <br />
    //           <TextField
    //             type="password"
    //             hintText="Podaj hasło"
    //             floatingLabelText="Hasło"
    //             onChange={(event, newValue) => this.setState({ password: newValue })}
    //           />
    //           <br />
    //           <RaisedButton label="Zaloguj" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
    //         </div>
    //       </MuiThemeProvider>
    //     )
    //   }
    //   this.setState({
    //     menuValue: value,
    //     loginComponent: localloginComponent,
    //     loginRole: loginRole
    //   })
    // }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Logowanie"
                    />
                </MuiThemeProvider>
                {this.state.loginComponent}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Login;