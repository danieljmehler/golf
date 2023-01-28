import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class AddCourseModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    handleChange = event => {
        let { name, value } = event.target;
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    }

    render() {
        const { toggle, onSave, show } = this.props;
        return (
            <Modal show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                name="name"
                                value={this.state.activeItem.name}
                                onChange={this.handleChange}
                                placeholder="e.g., Freeport Country Club"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        Close
                    </Button>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };
}

export default AddCourseModal