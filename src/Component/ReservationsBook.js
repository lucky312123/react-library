import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Navbar from "react-bootstrap/Navbar";
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import axios from "axios";
import {apiUrl} from "./Url";

class ReservationsBook extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.state = { value: ''};
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleLend(user) {
        console.log(user)
        const headers = {

            "Authorization": `Bearer ${this.props.token}`
        }
        axios({ method: 'POST', url: apiUrl+`reservations/lend/${user}`, headers: headers})
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    alert("Wydano książkę")
                }
            }).catch(function (error) {
            console.log(error);
        })

        this.setState(state => {
            state.users = user;
            return state;
        })
    }


    handleReturn(user) {
        console.log(user)
        const headers = {

            "Authorization": `Bearer ${this.props.token}`
        }
        axios({ method: 'POST', url: apiUrl+`reservations/return/${user}`, headers: headers})
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    alert("Książka została oddana")
                }
            }).catch(function (error) {
            console.log(error);
        })

        this.setState(state => {
            state.users = user;
            return state;
        })
    }


    async loadData() {
        const zmienna = this.state.value;
        console.log(zmienna)
        const data = await axios.get(apiUrl+`reservations`, { headers: { "Authorization": `Bearer ${this.props.token}` }, params: {email: zmienna} })
        return await data.data;

    }

    showData() {

        this.loadData().then(data => {

                let users = data.map((user) => {
                    return (
                        <tr key={user.reservationId}>
                            <td>{user.bookAuthor}</td>
                            <td>{user.bookTitle}</td>
                            <td>{user.bookGenre}</td>
                            <td>{user.bookIsbn}</td>
                            <td>{user.bookReleaseDate}</td>
                            <td>{user.reservationDate}</td>
                            <td>{user.bookStatus === "RESERVED" ? "Zarezerwowana" : user.bookStatus === "BORROWED" ? "Wypożyczona":"Dostepna"}</td>
                            <td><Button variant="info" onClick={() => this.handleReturn(user.reservationId)} disabled ={user.bookStatus === "RESERVED"}>Zwróć</Button></td>
                            <td><Button variant="info" onClick={() => this.handleLend(user.reservationId)} disabled ={user.bookStatus === "BORROWED"}>Wypożycz</Button></td>
                            {/*<td><Button variant="outline-primary"  disabled ={user.bookStatus === "RESERVED" || user.bookStatus === "BORROWED"} >{user.bookStatus === "RESERVED" ? "Zarezerwowana" : user.bookStatus === "BORROWED" ? "Wypożyczona":"Wypożycz"} </Button>{' '}</td>*/}
                        </tr>
                    )
                })
                this.setState({ users })
            }

        ).catch(err => { console.log(err) });

    }

    // handleClick(event) {
    //     const zmienna = this.state.value;
    //     //przyklad: http://34.90.183.236:8080/reservations?email=jacekp@g
    //     const url = new URL("http://34.90.183.236:8080/reservations"),
    //         params = {email: zmienna};
    //     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //     fetch(url)
    //         .then(results => {
    //             return results.json();
    //         }).then(data => {
    //         let users = data.map((user) => {
    //             return (
    //                 <tr key={user.reservationId}>
    //                     <td>{user.bookAuthor}</td>
    //                     <td>{user.bookTitle}</td>
    //                     <td>{user.bookGenre}</td>
    //                     <td>{user.bookIsbn}</td>
    //                     <td>{user.bookReleaseDate}</td>
    //                     <td>{user.reservationDate}</td>
    //                     <td>{user.bookStatus === "RESERVED" ? "Zarezerwowana" : user.bookStatus === "BORROWED" ? "Wypożyczona":"Wypożycz"}</td>
    //                     <td><Button variant="info" disabled ={user.bookStatus === "RESERVED"}>Wypożycz</Button></td>
    //                     <td><Button variant="info" disabled ={user.bookStatus === "BORROWED"}>Zwróć</Button></td>
    //                     {/*<td><Button variant="outline-primary"  disabled ={user.bookStatus === "RESERVED" || user.bookStatus === "BORROWED"} >{user.bookStatus === "RESERVED" ? "Zarezerwowana" : user.bookStatus === "BORROWED" ? "Wypożyczona":"Wypożycz"} </Button>{' '}</td>*/}
    //                 </tr>
    //             )
    //         })
    //         this.setState({ users: users });
    //         console.log("state", this.state.users)
    //     })
    // }

    render() {
        return (
            <div>
                <p>Podaj email czytelnika</p>
                <Navbar className="bg-light justify-content-center">
                    <Form inline>
                        <FormControl type="text" value={this.state.value} onChange={this.handleChange} placeholder="Wpisz email" className=" mr-sm-4" />
                        <Button variant="primary" onClick={(event) => this.showData(event)}>Szukaj</Button>
                    </Form>
                </Navbar>
                <br/>
                <h1>Książki czytelnika</h1>
                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Tytuł</th>
                        <th>Gatunek</th>
                        <th>ISBN</th>
                        <th>Data wydania</th>
                        <th>Data wypożyczenia</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users}
                    </tbody>
                </Table>
            </div>


        )
    }






}
export default ReservationsBook;