import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class DeleteRoundModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    render() {
        const { toggle, onSubmit, show } = this.props;
        return (
            <Modal show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Round</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the round?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => onSubmit(this.state.activeItem)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };
}

export default DeleteRoundModal