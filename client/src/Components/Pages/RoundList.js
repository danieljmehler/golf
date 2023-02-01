import { Component } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AddEditRoundModal from "./Rounds/AddEditRoundModal"
import DeleteRoundModal from "./Rounds/DeleteRoundModal"

class RoundList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: { // Round
                name: "",
                golfer: "",
                course: "",
                tee: "",
                holes: []
            },
            rounds: []
        };
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList = () => {
        axios
            .get("http://localhost:8000/rounds/")
            .then(res => this.setState({ rounds: res.data.results }))
            .catch(err => console.log(err));
    };

    toggleAddEditRoundModal = () => {
        this.setState({ addEditRoundModal: !this.state.addEditRoundModal });
    };

    toggleDeleteRoundModal = () => {
        this.setState({ deleteRoundModal: !this.state.deleteRoundModal });
    };

    handleRoundSubmit = item => {
        console.log("item")
        console.log(item)
        this.toggleAddEditRoundModal();
        if (item.id) {
            axios
                .put(`http://localhost:8000/rounds/${item.id}/`, item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        } else {
            axios
                .post("http://localhost:8000/rounds/", item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        }
    };

    handleRoundDelete = item => {
        this.toggleDeleteRoundModal();
        axios
            .delete(`http://localhost:8000/rounds/${item.id}/`, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => this.refreshList())
            .catch(err => console.log(err));
    };

    createRound = () => {
        const item = {
            golfer: "",
            date: "",
            course: "",
            tee: "",
            holes: []
        };
        this.setState({ activeItem: item, addEditRoundModal: !this.state.addEditRoundModal });
    };

    renderRoundListItem = () => {
        return this.state.rounds.map((round) => (
            <ListGroup.Item
                key={round.id}
                as="li"
                className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <Link to={`/rounds/${round.id}`} state={round}>{round.date}</Link>
                    </div>
                </div>

                <ButtonGroup>
                    <Button variant="primary" onClick={() => this.setState({ activeItem: round, addEditRoundModal: !this.state.addEditRoundModal })}>Edit</Button>
                    <Button variant="danger" onClick={() => this.setState({ activeItem: round, deleteRoundModal: !this.state.deleteRoundModal })}>Delete</Button>
                </ButtonGroup>
            </ListGroup.Item >
        ));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6"><h1 className='text-center'>Rounds</h1></Col>
                    <Col md="3"></Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <ListGroup>
                            <ListGroup.Item>
                                <Button onClick={this.createRound} variant="primary">
                                    Add Round
                                </Button>
                            </ListGroup.Item>
                            {this.renderRoundListItem()}
                        </ListGroup>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditRoundModal ? (
                    <AddEditRoundModal
                        activeItem={this.state.activeItem}
                        courses={this.state.courses}
                        toggle={this.toggleAddEditRoundModal}
                        onSubmit={this.handleRoundSubmit}
                        show={this.state.addEditRoundModal}
                    />
                ) : null}
                {this.state.deleteRoundModal ? (
                    <DeleteRoundModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleDeleteRoundModal}
                        onSubmit={this.handleRoundDelete}
                        show={this.state.deleteRoundModal}
                    />
                ) : null}
            </Container>
        );
    }
}

export default RoundList;