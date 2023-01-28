import { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AddCourseModal from "./Courses/AddCourseModal"
import DeleteCourseModal from "./Courses/DeleteCourseModal"

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: {
                name: "",
                tees: [],
                rounds: []
            },
            courses: []
        };
    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList = () => {
        axios
            .get("http://localhost:8000/courses/")
            .then(res => this.setState({ courses: res.data.results }))
            .catch(err => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    toggleDeleteModal = () => {
        this.setState({ deleteModal: !this.state.deleteModal });
    };

    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:8000/courses/${item.id}/`, item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        } else {
            axios
                .post("http://localhost:8000/courses/", item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        }
    };

    handleDelete = item => {
        this.toggleDeleteModal();
        axios
            .delete(`http://localhost:8000/courses/${item.id}/`, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => this.refreshList())
            .catch(err => console.log(err));
    };

    createItem = () => {
        const item = { name: "", tees: [], rounds: [] };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    renderCourseListItem = () => {
        return this.state.courses.map((course) => (
            <ListGroup.Item
                key={course.id}
                as="li"
                className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{course.name}</div>
                    # Holes | Par # | # Yards
                </div>
                <ButtonGroup>
                    <DropdownButton as={ButtonGroup} title="Edit" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1" onClick={() => this.setState({ activeItem: course, modal: !this.state.modal })}>Edit Course</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Edit Course Tees</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="danger" onClick={() => this.setState({ activeItem: course, deleteModal: !this.state.deleteModal })}>Delete</Button>
                </ButtonGroup>
            </ListGroup.Item >
        ));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6"><h1 className='text-center'>Courses</h1></Col>
                    <Col md="3"></Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <ListGroup>
                            <ListGroup.Item>
                                <Button onClick={this.createItem} variant="primary">
                                    Add Course
                                </Button>
                            </ListGroup.Item>
                            {this.renderCourseListItem()}
                        </ListGroup>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.modal ? (
                    <AddCourseModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                        show={this.state.modal}
                    />
                ) : null}
                {this.state.deleteModal ? (
                    <DeleteCourseModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleDeleteModal}
                        onDelete={this.handleDelete}
                        show={this.state.deleteModal}
                    />
                ) : null}
            </Container>
        );
    }
}

export default Courses;