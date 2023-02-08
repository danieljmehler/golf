// Library imports
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


class AddEditCourseModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    handleChange = event => {
        let { name, value } = event.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    }

    render() {
        const { toggle, onSubmit, show } = this.props;
        return (
            <Modal
                show={show}
                onHide={toggle}>
                <Modal.Header
                    closeButton>
                    <Modal.Title>Add Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                name="name"
                                value={this.state.activeItem.name}
                                placeholder="e.g., Freeport Country Club"
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

export default AddEditCourseModal;