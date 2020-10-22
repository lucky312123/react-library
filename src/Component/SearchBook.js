import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Navbar from "react-bootstrap/Navbar";
import {Form} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import axios from 'axios';
import {apiUrl} from "./Url";

class SearchBook extends Component {
    constructor(props) {
        super(props);
        this.state = {books: []};
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleReservation(book) {
        console.log('tokkken', this.props.token);
        const headers = {

            "Authorization": `Bearer ${this.props.token}`
        }
        axios({method: 'POST', url: apiUrl + `reservations/borrow/${book}`, headers: headers})
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    alert("Zarezerwowano książkę")
                }
            }).catch(function (error) {
            console.log(error);
        })

        this.setState(state => {
            state.books = book;
            return state;
        })
    }

    async loadData() {
        const zmienna = this.state.value;

        const data = await axios.get(apiUrl + `books`, {
            headers: {"Authorization": `Bearer ${this.props.token}`},
            params: {search: 'title%' + zmienna}
        })
        return await data.data;

    }

    showData() {

        this.loadData().then(data => {
                console.log("wpadada", data);

                let books = data.map((book) => {
                    return (
                        <tr key={book.id}>

                            <td>{book.author}</td>
                            <td>{book.title}</td>
                            <td>{book.genre}</td>
                            <td>{book.isbn}</td>
                            <td>{book.releaseDate}</td>
                            <td><Button variant="outline-primary" onClick={() => this.handleReservation(book.id)}
                                        disabled={book.status === "RESERVED" || book.status === "BORROWED"}>
                                {book.status === "RESERVED" ? "Zarezerwowana" : book.status === "BORROWED" ? "Wypożyczona" : "Zarezerwuj"}</Button>
                            </td>
                        </tr>
                    )
                })
                this.setState({books})
            }
        ).catch(err => {
            console.log(err)
        });

    }


    render() {
        return (
            <div>
                <p>Podaj tytuł ksiązki</p>
                <Navbar className="bg-light justify-content-center">
                    <Form inline>
                        <FormControl type="text" value={this.state.value} onChange={this.handleChange}
                                     placeholder="Wpisz tytuł książki" className=" mr-sm-4"/>
                        <Button variant="primary" onClick={(event) => this.showData(event)}>Szukaj</Button>
                    </Form>
                </Navbar>
                <br/>
                <h1>Wyszukane książki</h1>
                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Tytuł</th>
                        <th>Gatunek</th>
                        <th>ISBN</th>
                        <th>Data wydania</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.books}
                    </tbody>
                </Table>
            </div>


        )
    }
}

export default SearchBook;