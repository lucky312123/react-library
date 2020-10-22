import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from "@material-ui/core/Drawer";
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import LoginScreen from './LoginScreen';
import LibraryScreen from './LibraryScreen';
import LibraryMenScreen from './LibraryMenScreen';
import InformationScreen from "./InformationScreen";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { draweropen: false, currentScreen: [] };
  }



  componentDidMount() {
    var currentScreen = [];
    if (this.props.role === "ROLE_READER") {
      console.log("token", this.props.token);
      currentScreen.push(<LibraryScreen appContext={this.props.appContext} role={this.props.role} name={this.props.firstName} token={this.props.token}
        lastName={this.props.lastName} numBorrowed={this.props.numBorrowed} cashPenalty={this.props.cashPenalty} email={this.props.email}
      />);
      this.setState({ currentScreen })
    } else {
      currentScreen.push(<LibraryMenScreen appContext={this.props.appContext} role={this.props.role} name={this.props.firstName} token={this.props.token} />);
      this.setState({ currentScreen })
    }

  }

  toggleDrawer = () => {
    // console.log("drawer click");

    this.setState({ draweropen: !this.state.draweropen })
  }
  closeDrawer = () => {
    console.log("drawer click", this.state.draweropen);
    if (this.state.draweropen === true) {
      console.log("asd")
      this.setState({ draweropen: false })
    }

  }

  handleMenuClick(event, page) {
    switch (page) {
      case "information":
        // console.log("need to open uploadapge")
        var currentScreen = [];
        currentScreen.push(<InformationScreen appContext={this.props.appContext} token={this.props.token} role={this.props.role} name={this.props.firstName}
          lastName={this.props.lastName} numBorrowed={this.props.numBorrowed} cashPenalty={this.props.cashPenalty} email={this.props.email}
        />);
        this.setState({ currentScreen })
        break;

      case "search":
        // console.log("need to open uploadapge")
        var currentScreen = [];
        currentScreen.push(<LibraryScreen appContext={this.props.appContext} token={this.props.token} role={this.props.role} name={this.props.firstName} />);
        this.setState({ currentScreen })
        break;

      case "logout":
        var loginPage = [];
        loginPage.push(<LoginScreen appContext={this.props.appContext} />);
        this.props.appContext.setState({ loginPage: loginPage, libraryScreen: [] })
        break;
    }
    this.setState({ draweropen: false })
  }



  render() {
    return (
      <div>
        <div className="App">


          <MuiThemeProvider>

            <AppBar title="Biblioteka"
              // onClick={this.toggleDrawer}
              onLeftIconButtonClick={this.toggleDrawer}
              
              // iconElementLeft={ <IconButton onTouchTap={ event => this.toggleDrawer(event) }  >
              //                     <MoreVertIcon />
              //                   </IconButton> }
              isInitiallyOpen={true} />
          </MuiThemeProvider>

          <MuiThemeProvider>
            <Drawer

              ModalProps={{ onBackdropClick: this.toggleDrawer, onEscapeKeyDown: this.toggleDrawer }}
              open={this.state.draweropen}>
              <MenuItem>
                <div>
                  Menu
                </div>
              </MenuItem>
              <div>
                {this.props.role === "ROLE_READER" ? <MenuItem onClick={(event) => this.handleMenuClick(event, "information")}>
                  Informacje
              </MenuItem> : null}

                {this.props.role === "ROLE_READER"?<MenuItem onClick={(event) => this.handleMenuClick(event, "search")}>
                  Wyszukaj książki
                </MenuItem>: null}

                <MenuItem onClick={(event) => this.handleMenuClick(event, "logout")}>
                  Wyloguj
              </MenuItem>
              </div>
            </Drawer>

          </MuiThemeProvider>


        </div>
        <div >
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}

export default Library;