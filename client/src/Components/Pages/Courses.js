import { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import AddCourseModal from "./Courses/AddCourseModal"

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

    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:8000/courses/${item.id}/`, item)
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

    createItem = () => {
        const item = { name: "", tees: [], rounds: [] };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    renderCourseListItem = () => {
        return this.state.courses.map((course) => (
            <ListGroup.Item key={course.id}>
                <div>
                    <div className="fw-bold">{course.name}</div>
                    <div className="text-muted"># Hole | Par # | # yards</div>
                </div>
            </ListGroup.Item>
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
                <AddCourseModal
                    activeItem={this.state.activeItem}
                    toggle={this.toggle}
                    onSave={this.handleSubmit}
                    show={this.state.modal}
                />
            </Container>
        );
    }
}

export default Courses;