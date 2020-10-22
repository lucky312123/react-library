import React, {Component, useState} from 'react';
import {Button} from 'react-bootstrap';
import {Form, FormControl, Alert, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {apiUrl} from "./Url";

class EditBookComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            setShow: true
        }
        this.author2 = React.createRef();
        this.title2 = React.createRef();
        this.genre2 = React.createRef();
        this.isbn2 = React.createRef();
        this.releaseDate2 = React.createRef();

    }

    setShow(show) {
        this.setState({
            show: !this.state.show
        })
        var apiBaseUrl = apiUrl + `books/${this.props.book.id}`;
        let body = {
            title: this.title2.current.value,
            author: this.author2.current.value,
            genre: this.genre2.current.value,
            isbn: this.isbn2.current.value,
            releaseDate: this.releaseDate2.current.value,
        }
        axios.put(apiBaseUrl, body, {headers: {"Authorization": `Bearer ${this.props.token}`}})
            .then(function (response) {

                if (response.status === 200) {
                    console.log(response);
                    alert("Edytowano ksążkę")


                }
            }).catch(function (error) {
            console.log(error);
        })

        //
        // this.setState(state => {
        //     state.show = show;
        //     return state;
        // })

    }

    render() {
        console.log(this.props.book.title)
        return (
            <>
                <Alert show={this.state.show} variant="success">
                    <Alert.Heading>Edycja książki!</Alert.Heading>
                    <Form>
                        <Form.Group as={Row} controlId="validationTitle">
                            <Form.Label column sm={2}> Podaj tytuł </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    required
                                    type="text"
                                    name="title"
                                    defaultValue={this.props.book.title}
                                    placeholder="Tytuł"
                                    ref={this.title2}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj tytuł!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="validationAuthor">
                            <Form.Label column sm={2}> Podaj autora </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    required
                                    type="text"
                                    name="author"
                                    defaultValue={this.props.book.author}
                                    placeholder="Autor"

                                    ref={this.author2}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj autora!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="validationGenre">
                            <Form.Label column sm={2}> Podaj gatunek </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    as="select"
                                    required
                                    defaultValue={this.props.book.genre}
                                    ref={this.genre2}
                                >
                                    <option>dramat</option>
                                    <option>powiesc</option>
                                    <option>wiersz</option>
                                    <option>historyczna</option>
                                    <option>fantasy</option>
                                    <option>horror</option>
                                    <option>komedia</option>
                                    <option>autobiografia</option>
                                    <option>kryminal</option>
                                    <option>tragedia</option>
                                    <option>przygodowa</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Podaj gatunek!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="validationIsbn">
                            <Form.Label column sm={2}> Podaj ISBN </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    required
                                    type="text"
                                    name="isbn"
                                    defaultValue={this.props.book.isbn}
                                    placeholder="ISBN"

                                    ref={this.isbn2}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj ISBN!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="validationRelaseDate">
                            <Form.Label column sm={2}> Podaj datę wydania </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    required
                                    type="text"
                                    name="releaseDate"
                                    defaultValue={this.props.book.releaseDate}
                                    placeholder="Data wydania"

                                    ref={this.releaseDate2}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj datę wydania!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                    </Form>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setShow(false)} variant="outline-success">
                            Wykonaj edycję
                        </Button>
                    </div>
                </Alert>
            </>
        );
    }
}

export default EditBookComponent;