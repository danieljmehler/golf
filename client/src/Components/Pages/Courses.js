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

    toggleAddEditCourseModal = () => {
        this.setState({ addEditCourseModal: !this.state.addEditCourseModal });
    };

    toggleDeleteCourseModal = () => {
        this.setState({ deleteCourseModal: !this.state.deleteCourseModal });
    };

    handleCourseSubmit = item => {
        this.toggleAddEditCourseModal();
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

    handleCourseDelete = item => {
        this.toggleDeleteCourseModal();
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

    createCourse = () => {
        const item = { name: "", tees: [], rounds: [] };
        this.setState({ activeItem: item, addEditCourseModal: !this.state.addEditCourseModal });
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
                        <Dropdown.Item eventKey="deleteCourse" onClick={() => this.setState({ activeItem: course, addEditCourseModal: !this.state.addEditCourseModal })}>Edit Course</Dropdown.Item>
                        <Dropdown.Item eventKey="addCourseTees">Add Course Tees</Dropdown.Item>
                        {course.tees.length > 0 ? (
                            <Dropdown.Item eventKey="editCourseTees">Edit Course Tees</Dropdown.Item>
                        ) : null}
                    </DropdownButton>
                    <Button variant="danger" onClick={() => this.setState({ activeItem: course, deleteCourseModal: !this.state.deleteCourseModal })}>Delete</Button>
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
                                <Button onClick={this.createCourse} variant="primary">
                                    Add Course
                                </Button>
                            </ListGroup.Item>
                            {this.renderCourseListItem()}
                        </ListGroup>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditCourseModal ? (
                    <AddCourseModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleAddEditCourseModal}
                        onSubmit={this.handleCourseSubmit}
                        show={this.state.addEditCourseModal}
                    />
                ) : null}
                {this.state.deleteCourseModal ? (
                    <DeleteCourseModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleDeleteCourseModal}
                        onSubmit={this.handleCourseDelete}
                        show={this.state.deleteCourseModal}
                    />
                ) : null}
            </Container>
        );
    }
}

export default Courses;