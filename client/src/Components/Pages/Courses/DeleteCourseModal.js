import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class DeleteCourseModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    render() {
        const { toggle, onDelete, show } = this.props;
        return (
            <Modal show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the course "{this.state.activeItem.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(this.state.activeItem)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };
}

export default DeleteCourseModal