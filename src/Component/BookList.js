import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

var config = {
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        'Access-Control-Allow-Credentials': true
    }
};

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        }

    }

    componentDidMount() {
        // var x = [];
        // this.props.data.then(function (result) {
        //     console.log("boobks",result)
        //     x =   result
        // })
        console.log("book", this.doSomething())

        this.gett()

    }

    async gett() {
        let result = await this.doSomething();
        this.setState({
            books: result
        })
        console.log("check book", this.state.books)
    }

    doSomething() {
        let x = this.props.data.then(function (result2) {
            return result2
        });
        return x

    }

    renderTableData() {
        return this.state.books.map(user => (
                <tr>

                    <td>{user.title}</td>
                    <td>{user.author}</td>
                    <td>{user.genre}</td>
                    <td>{user.isbn}</td>
                    <td>{user.releaseDate}</td>
                    <td><Button variant="outline-primary"
                                disabled={user.status === "RESERVED"}>{user.status === "RESERVED" ? "Zarezerwowana" : "Wypożycz"} </Button>{' '}
                    </td>
                </tr>
            )
        )
    }

    render() {
        return (
            // <ul>
            //     {users.map(user => (
            //         <li key={user.id}>
            //             <Book
            //             autor = {user.name}/>
            //         </li>
            //     ))}
            // </ul>

            <div>
                <h1>Książki</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Tytuł</th>
                        <th>Autor</th>
                        <th>Gatunek</th>
                        <th>ISBN</th>
                        <th>Data wydania</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </Table>
            </div>


        )
    }
}

export default BookList;
