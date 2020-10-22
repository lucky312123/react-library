import React, {Component} from 'react';
import './App.css';
import ManagementBooks from './Component/ManagementBooks';
import AddBook from './Component/AddBook';
import ReservationsBook from './Component/ReservationsBook';
import {Card, Tab} from 'react-bootstrap';
import {Tabs} from 'react-bootstrap';


class LibraryMenScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'bibliotekarz',
            draweropen: true,
            author: "test",
            showB: false,
            data: []
        }
    }

    componentDidMount() {
        console.log(this.props.token)
    }


    render() {
        return (
            <div className="App">
                <div>
                    <div>
                        <Card>
                            <Card.Body>Zalogowany jako bibliotekarz {this.props.name}</Card.Body>
                        </Card>
                    </div>

                    {/*<MuiThemeProvider>*/}
                    {/*  <RaisedButton disabled={this.state.printButtonDisabled} label="OK" primary={true} style={style} onClick={(event) => this.handleClick(event)} />*/}
                    {/*</MuiThemeProvider>*/}
                </div>

                <Tabs defaultActiveKey="management" id="uncontrolled-tab-example">
                    <Tab eventKey="management" title="Zarządzanie książkami">
                        <ManagementBooks token={this.props.token}/>
                    </Tab>
                    <Tab eventKey="add" title="Dodaj książkę">
                        <AddBook token={this.props.token}/>
                    </Tab>
                    <Tab eventKey="reservation" title="Wypożyczenia/Zwroty">
                        <ReservationsBook token={this.props.token}/>
                    </Tab>
                </Tabs>


            </div>
        );
    }
}


export default LibraryMenScreen;
