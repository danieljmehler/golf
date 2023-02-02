// Library imports
import { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Local imports
import AddEditCourseModal from "./Courses/AddEditCourseModal";
import DeleteCourseModal from "./Courses/DeleteCourseModal";


class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: { // Course
                name: "",
                tees: [],
                rounds: []
            },
            courses: []
        };
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        axios
            .get("http://localhost:8000/courses/")
            .then(res => this.setState({ courses: res.data.results }))
            .catch(err => console.log(err));
    }

    toggleAddEditCourseModal = () => {
        this.setState({ addEditCourseModal: !this.state.addEditCourseModal });
    }

    toggleDeleteCourseModal = () => {
        this.setState({ deleteCourseModal: !this.state.deleteCourseModal });
    }

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
                .then(res => this.refreshData())
                .catch(err => console.log(err));
        } else {
            axios
                .post("http://localhost:8000/courses/", item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshData())
                .catch(err => console.log(err));
        }
    }

    handleCourseDelete = item => {
        this.toggleDeleteCourseModal();
        axios
            .delete(`http://localhost:8000/courses/${item.id}/`, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => this.refreshData())
            .catch(err => console.log(err));
    }

    createCourse = () => {
        const item = { name: "", tees: [], rounds: [] };
        this.setState({ activeItem: item, addEditCourseModal: !this.state.addEditCourseModal });
    }

    renderCourseListItem = () => {
        return this.state.courses.map((course) =>
            <ListGroup.Item
                key={course.id}
                className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <Link
                            to={`/courses/${course.id}`}
                            state={{ course: course }}>
                            {course.name}
                        </Link>
                    </div>
                </div>

                <ButtonGroup>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ activeItem: course, addEditCourseModal: !this.state.addEditCourseModal })}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => this.setState({ activeItem: course, deleteCourseModal: !this.state.deleteCourseModal })}>
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
                    <Col md="3"></Col>
                    <Col md="6">
                        <h1 className='text-center'>Courses</h1>
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
                                    onClick={this.createCourse}>
                                    Add Course
                                </Button>
                            </ListGroup.Item>
                            {this.renderCourseListItem()}
                        </ListGroup>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditCourseModal ? (
                    <AddEditCourseModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleAddEditCourseModal}
                        show={this.state.addEditCourseModal}
                        onSubmit={this.handleCourseSubmit}
                    />
                ) : null}
                {this.state.deleteCourseModal ? (
                    <DeleteCourseModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleDeleteCourseModal}
                        show={this.state.deleteCourseModal}
                        onSubmit={this.handleCourseDelete}
                    />
                ) : null}
            </Container>
        );
    }
}

export default CourseList;