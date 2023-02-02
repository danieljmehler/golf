
// Library imports
import { Component } from 'react';
import { Link, useParams, useLocation } from "react-router-dom"
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// Local imports
import AddEditTeeModal from "./../Tees/AddEditTeeModal"
import DeleteTeeModal from "./../Tees/DeleteTeeModal"


class CourseDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.params.courseId,
            course: {
                name: "",
                tees: [],
                rounds: []
            },
            activeItem: { // Tee
                name: "",
                course: {},
                holes: [] // HoleInfo
            },
            tees: []
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        let { course, tees } = this.state;
        axios
            .get(`http://localhost:8000/courses/${this.state.id}`)
            .then(res => {
                course = res.data;
                return Promise.all([]);
            })
            .then(res => {
                let promises = [];
                course.tees.forEach((tee) => {
                    promises.push(axios.get(tee));
                });
                return Promise.all(promises);
            })
            .then(res => {
                tees = res.map(tee => tee.data);
                return Promise.all([]);
            })
            .then(res => this.setState({
                course: course,
                tees: tees
            }))
            .catch(err => console.log(err));
    }

    toggleAddEditTeeModal = () => {
        this.setState({ addEditTeeModal: !this.state.addEditTeeModal });
    }

    toggleDeleteTeeModal = () => {
        this.setState({ deleteTeeModal: !this.state.deleteTeeModal });
    }

    createTee = course => {
        const item = {
            name: "",
            course: course.id,
            holes: []
        };
        this.setState({
            activeItem: item,
            addEditTeeModal: !this.state.addEditTeeModal
        });
    }

    handleTeeSubmit = item => {
        item.course = this.state.course.url;
        this.toggleAddEditTeeModal();
        if (item.id) {
            axios
                .put(`http://localhost:8000/tees/${item.id}/`, item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        } else {
            axios
                .post("http://localhost:8000/tees/", item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        }
    }

    handleTeeDelete = item => {
        this.toggleDeleteTeeModal();
        axios
            .delete(`http://localhost:8000/tees/${item.id}/`, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => this.refreshList())
            .catch(err => console.log(err));
    }

    renderTeeListItem = () => {
        return this.state.tees.map((tee) =>
            <ListGroup.Item
                key={tee.id}
                className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <Link
                            to={`/tees/${tee.id}`}>
                            {tee.name}
                        </Link>
                    </div>
                </div>

                <ButtonGroup>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ activeItem: tee, addEditTeeModal: !this.state.addEditTeeModal })}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => this.setState({ activeItem: tee, deleteTeeModal: !this.state.deleteTeeModal })}>
                        Delete
                    </Button>
                </ButtonGroup>
            </ListGroup.Item >
        );
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Breadcrumb>
                        <Breadcrumb.Item
                            href="/courses">
                            Courses
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            active>
                            {this.state.course.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <h1 className='text-center'>{this.state.course.name}</h1>
                        <h2 className='text-center'>Tees</h2>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <ListGroup>
                            <ListGroup.Item>
                                <Button
                                    variant="primary"
                                    onClick={this.createTee}>
                                    Add Tees
                                </Button>
                            </ListGroup.Item>
                            {this.renderTeeListItem()}
                        </ListGroup>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditTeeModal ? (
                    <AddEditTeeModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleAddEditTeeModal}
                        show={this.state.addEditTeeModal}
                        onSubmit={this.handleTeeSubmit}
                    />
                ) : null}
                {this.state.deleteTeeModal ? (
                    <DeleteTeeModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleDeleteTeeModal}
                        show={this.state.deleteTeeModal}
                        onSubmit={this.handleTeeDelete}
                    />
                ) : null}
            </Container>
        );
    }
}

const Fn = (props) => {
    const params = useParams();
    const location = useLocation();

    return (
        <CourseDetail
            {...props}
            params={params}
            location={location}
        />);
}

export default Fn;