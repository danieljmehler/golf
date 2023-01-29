import { Component } from 'react';
import { Link, useParams } from "react-router-dom"
import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AddEditHoleInfoModal from "./../HoleInfo/AddEditHoleInfoModal"
import DeleteHoleInfoModal from "./../HoleInfo/DeleteHoleInfoModal"


class TeeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.params.teeId,
            tee: {
                name: "",
                course: {},
                holes: []
            },
            activeItem: {  // HoleInfo
                number: "",
                tee: {},
                par: "",
                handicap: "",
                yards: "",
                scores: [] // HoleScore
            }
        };
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList = () => {
        axios
            .get("http://localhost:8000/tees/" + this.state.id)
            .then(res => this.setState({
                tee: res.data,
                activeItem: {
                    number: "",
                    tee: res.data.id,
                    par: "",
                    handicap: "",
                    yards: "",
                    scores: []
                }
            }))
            .catch(err => console.log(err));
    };

    toggleAddEditHoleInfoModal = () => {
        this.setState({ addEditHoleInfoModal: !this.state.addEditHoleInfoModal });
    };

    toggleDeleteHoleInfoModal = () => {
        this.setState({ deleteHoleInfoModal: !this.state.deleteHoleInfoModal });
    };

    createHoleInfo = tee => {
        const item = {
            number: "",
            tee: tee.id,
            par: "",
            handicap: "",
            yards: "",
            scores: []
        };
        this.setState({ activeItem: item, addEditHoleInfoModal: !this.state.addEditHoleInfoModal });
    };

    handleHoleInfoSubmit = item => {
        item.tee = this.state.tee.url;
        this.toggleAddEditHoleInfoModal();
        if (item.id) {
            axios
                .put(`http://localhost:8000/hole_info/${item.id}/`, item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        } else {
            axios
                .post("http://localhost:8000/hole_info/", item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        }
    };

    handleHoleInfoDelete = item => {
        this.toggleDeleteHoleInfoModal();
        axios
            .delete(`http://localhost:8000/hole_info/${item.id}/`, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => this.refreshList())
            .catch(err => console.log(err));
    };

    renderHoleInfoListItem = () => {
        return this.state.tee.holes.map((holeinfo) => (
            <ListGroup.Item
                key={holeinfo.id}
                as="li"
                className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <Link to={`/hole_info/${holeinfo.id}`} state={holeinfo}>Hole {holeinfo.number}</Link>
                    </div>
                </div>

                <ButtonGroup>
                    <Button variant="primary" onClick={() => this.setState({ activeItem: holeinfo, addEditHoleInfoModal: !this.state.addEditHoleInfoModal })}>Edit</Button>
                    <Button variant="danger" onClick={() => this.setState({ activeItem: holeinfo, deleteHoleInfoModal: !this.state.deleteHoleInfoModal })}>Delete</Button>
                </ButtonGroup>
            </ListGroup.Item >
        ));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6"><h1 className='text-center'>{this.state.tee.name}</h1></Col>
                    <Col md="3"></Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <ListGroup>
                            <ListGroup.Item>
                                <Button onClick={this.createHoleInfo} variant="primary">
                                    Add Hole Info
                                </Button>
                            </ListGroup.Item>
                            {this.renderHoleInfoListItem()}
                        </ListGroup>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditHoleInfoModal ? (
                    <AddEditHoleInfoModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleAddEditHoleInfoModal}
                        onSubmit={this.handleHoleInfoSubmit}
                        show={this.state.addEditHoleInfoModal}
                    />
                ) : null}
                {this.state.deleteHoleInfoModal ? (
                    <DeleteHoleInfoModal
                        activeItem={this.state.activeItem}
                        tee={this.state.tee}
                        toggle={this.toggleDeleteHoleInfoModal}
                        onSubmit={this.handleHoleInfoDelete}
                        show={this.state.deleteHoleInfoModal}
                    />
                ) : null}
            </Container>
        );
    };
}

const Fn = (props) => {
    const params = useParams()
    return (
        <TeeDetail
            {...props}
            params={params}
        />);
};
export default Fn;