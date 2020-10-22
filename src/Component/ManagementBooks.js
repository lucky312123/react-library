import React, { Component, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Navbar from "react-bootstrap/Navbar";
import { Form, FormControl, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import EditBookComponent from './EditBookComponent';
import {apiUrl}  from "./Url";


class ManagementBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            value: '',
            book: {},
            showEdit:false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async loadData() {
        const zmienna = this.state.value;
        const data = await axios.get(apiUrl+"books", { headers: { "Authorization": `Bearer ${this.props.token}` }, params: {search: 'title%' + zmienna} })
        return await data.data;

    }

    handleDelete(book) {
        console.log(book);
        axios.delete(apiUrl+`books/${book}`, { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    alert("Usunięto ksążkę")
                }
            }).catch(function (error) {
                console.log(error);
            })

        this.setState(state => {
            state.books = book;
            return state;
        })
    }


    showData () {
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
                        <td><Button variant="outline-success" onClick={() => this.setToEdit(book)} >Edytuj</Button>{' '}</td>
                        <td><Button variant="danger" onClick={() => this.handleDelete(book.id)} disabled={book.status === "RESERVED" || book.status === "BORROWED"}>
                            {book.status === "RESERVED" ? "Zarezerwowana" : book.status === "BORROWED" ? "Wypożyczona" : "Usuń"}
                        </Button></td>
                    </tr>
                )
            })
            this.setState({ books })
        }

        ).catch(err => { console.log(err) });
    }

    setToEdit(book){

        this.setState({
            book ,
            showEdit:!this.state.showEdit
        })

    }

    handleSearch(event) {
        this.showData()
    }


    render() {
        return (
            <div>
                <p>Podaj tytuł ksiązki</p>
                <Navbar className="bg-light justify-content-center">
                    <Form inline>
                        <FormControl type="text" value={this.state.value} onChange={this.handleChange} placeholder="Wpisz tytuł książki" className=" mr-sm-4" />
                        <Button variant="primary" onClick={(event) => this.handleSearch(event)} className=" mr-sm-4">Szukaj</Button>
                        <Button onClick={()=>this.showData()}>Odśwież</Button>
                    </Form>
                </Navbar>
                <br />
                <h1>Wyszukane książki</h1>
                <br />
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
               {this.state.showEdit === true ? <EditBookComponent book={this.state.book} token = {this.props.token} /> :null}
            </div>


        )
    }

}
export default ManagementBooks;