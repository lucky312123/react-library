import React, {Component} from 'react';
import './App.css';
import Book from './Component/Book';
import SearchBook from './Component/SearchBook';
import {Card} from 'react-bootstrap';
import axios from 'axios';
import {apiUrl} from "./Component/Url";

var config = {
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        'Access-Control-Allow-Credentials': true
    }
};

class LibraryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'użytkownik',
            printingmessage: '',
            draweropen: true,
            author: "JKM",
            showB: false,
            data: []
        }
    }

    componentDidMount() {
        if (!this.state.data) {
            this.getData().then(data => this.setState({data}))
                .catch(err => { /*...handle the error...*/
                });
        }

    }

    handleDivClick(event) {
        // console.log("event",event);
        if (this.state.draweropen) {
            this.setState({draweropen: false})
        }
    }

    clean(e) {
        console.log(e)
        console.log(this.state.author)
        if (e !== this.state.author)
            this.setState({

                showB: false
            })
    }


    async getData() {
        const data = await axios.get(apiUrl + "books", config);
        console.log(data.data)
        return await data.data;
    }


    render() {
        return (
            <div className="App">
                <div onClick={(event) => this.handleDivClick(event)}>

                    <div>
                        <Card>
                            <Card.Body>Zalogowany jako czytelnik {this.props.name}</Card.Body>
                        </Card>
                    </div>

                    <div>
                        {this.state.printingmessage}
                    </div>
                </div>
                <div>
                    <br/>
                    <SearchBook token={this.props.token}/>
                </div>
            </div>
        );
    }
}

export default LibraryScreen;