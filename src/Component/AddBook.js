import React, {Component} from 'react';
import {Button, Form, Row, Col, Alert} from "react-bootstrap";
import axios from 'axios';
import {apiUrl} from "./Url";

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            validated: false,
            setValidated: false
        }
        this.relaseDate = React.createRef();
        this.author = React.createRef();
        this.title = React.createRef();
        this.genre = React.createRef();
        this.isbn = React.createRef();
    }


    handleSubmits = (event) => {
        console.log("check")
        let form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({
            validated: true
        })
        this.handleSubmit(event)
    };

    clearForm = () => {
        document.getElementById("addBookFrom").reset();
    }


    addBookForm() {
        return (
            <Form noValidate validated={this.state.validated} id="addBookFrom" onSubmit={this.handleSubmits}>
                <Form.Group as={Row} controlId="validationTitle">
                    <Form.Label column sm={2}> Podaj tytuł </Form.Label>
                    <Col sm={2}>
                        <Form.Control
                            required
                            type="text"
                            name="title"
                            placeholder="Tytuł"
                            ref={this.title}
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
                            placeholder="Autor"
                            ref={this.author}
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
                            ref={this.genre}
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
                            placeholder="ISBN"
                            ref={this.isbn}
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj ISBN!
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                {/*Zmiana na react-datepicker*/}
                <Form.Group as={Row} controlId="validationRelaseDate">
                    <Form.Label column sm={2}> Podaj datę wydania </Form.Label>
                    <Col sm={2}>
                        <Form.Control
                            required
                            type="text"
                            name="releaseDate"
                            placeholder="DD-MM-RRRR"
                            ref={this.relaseDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            Podaj datę!
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{span: 2, offset: 2}}>
                        <Button onClick={e => this.handleSubmits(e)}>Dodaj książkę</Button>
                    </Col>
                </Form.Group>
            </Form>
        );
    }


    handleSubmit = (event) => {
        var apiBaseUrl = apiUrl+"books";
        event.preventDefault();
        let body = {
            title: this.title.current.value,
            author: this.author.current.value,
            genre: this.genre.current.value,
            isbn: this.isbn.current.value,
            releaseDate: this.relaseDate.current.value
        }
        console.log(body)
        axios.post(apiBaseUrl, body,{ headers: {"Authorization" :  `Bearer ${this.props.token}` }})
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response);
                    alert("Dodano ksążkę")
                }
            }).catch(function (error) {
            console.log(error);
            if (error.response.status === 500) {
                alert("Zły format daty")
            }
        })
        this.clearForm()
    }


    render() {
        return (
            <div>
                <br/>
                <br/>
                {this.addBookForm()}

            </div>
        )
    }


}

export default AddBook;