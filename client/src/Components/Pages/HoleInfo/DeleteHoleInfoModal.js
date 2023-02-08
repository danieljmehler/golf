// Library imports
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class DeleteHoleInfoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tee: this.props.tee,
            activeItem: this.props.activeItem
        };
    }

    render() {
        const { toggle, onSubmit, show } = this.props;
        return (
            <Modal
                show={show}
                onHide={toggle}>
                <Modal.Header
                    closeButton>
                    <Modal.Title>Delete Hole Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete hole {this.state.activeItem.number} for the "{this.state.tee.name}" tees?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={toggle}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onSubmit(this.state.activeItem)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteHoleInfoModal;