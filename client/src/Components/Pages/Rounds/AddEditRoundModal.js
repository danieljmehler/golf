// Library imports
import { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


class AddEditRoundModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            courses: [],
            golfers: [],
            tees: []
        };
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        let { golfers, courses } = this.state;
        axios
            .get("http://localhost:8000/golfers/", {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => {
                golfers = res.data.results;
                return Promise.all([]);
            })
            .then(res => axios.get("http://localhost:8000/courses/"))
            .then(res => {
                courses = res.data.results;
                return Promise.all([]);
            })
            .then(res => this.setState({
                golfers: golfers,
                courses: courses
            }))
            .catch(err => console.log(err));
    }

    handleChange = event => {
        let { name, value } = event.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    }

    handleCourseChange = event => {
        let { name, value } = event.target;
        let tees = this.state.tees;
        let course = this.state.courses.find(course => course.url === value);

        let promises = []
        course.tees.forEach((tee) => {
            promises.push(axios.get(tee));
        });
        Promise
            .all(promises)
            .then(res => {
                tees = res.map(tee => tee.data);
                return Promise.all([]);
            })
            .then(res => this.setState({
                tees: tees,
                activeItem: {
                    ...this.state.activeItem,
                    [name]: value
                }
            }))
            .catch(err => console.log(err));
    }

    render() {
        const { toggle, onSubmit, show } = this.props;
        return (
            <Modal
                show={show}
                onHide={toggle}>
                <Modal.Header
                    closeButton>
                    <Modal.Title>Add Round</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Golfer</Form.Label>
                            <Form.Select
                                name="golfer"
                                value={this.state.activeItem.golfer}
                                onChange={this.handleChange}>
                                <option>Select Golfer</option>
                                {this.state.golfers.map((golfer) =>
                                    <option
                                        key={golfer.id}
                                        value={golfer.url}>
                                        {golfer.username}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Course</Form.Label>
                            <Form.Select
                                name="course"
                                value={this.state.activeItem.course}
                                onChange={this.handleCourseChange}>
                                <option>Select course</option>
                                {this.state.courses.map((course) =>
                                    <option
                                        key={course.id}
                                        value={course.url}>
                                        {course.name}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tee</Form.Label>
                            {this.state.activeItem.course ? (
                                <Form.Select
                                    name="tee"
                                    value={this.state.activeItem.tee}
                                    onChange={this.handleChange}>
                                    <option>Select course</option>
                                    {this.state.tees.map((tee) =>
                                        <option
                                            key={tee.id}
                                            value={tee.url}>
                                            {tee.name}
                                        </option>
                                    )}
                                </Form.Select>
                            ) : (
                                <Form.Select disabled>
                                    <option>Please select course</option>
                                </Form.Select>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={this.state.activeItem.date}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={toggle}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => onSubmit(this.state.activeItem)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddEditRoundModal;