import React, { Component } from 'react';
import {Button, Form, Card, Table, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import {apiUrl} from "./Component/Url";


class InformationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.showData()
    }

    async loadData() {
        const data = await axios.get(apiUrl+`reservations`, { headers: { "Authorization": `Bearer ${this.props.token}` }})
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
                        </tr>
                    )
                })
                this.setState({ users })
            }

        ).catch(err => { console.log(err) });

    }



    render() {
        return (
            <div>
                <br/>
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Twoje dane</Card.Title>
                        <Container>
                            <Row>
                                <Col>Twój email: {this.props.email}</Col>
                            </Row>
                            <Row>
                                <Col>Imię: {this.props.name}</Col>
                            </Row>
                            <Row>
                                <Col>Nazwisko: {this.props.lastName}</Col>
                            </Row>
                            <Row>
                                <Col>Ilość wypożyczonych książek: {this.props.numBorrowed}</Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>

                <br/>
                <h1>Twoje książki</h1>
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
export default InformationScreen;