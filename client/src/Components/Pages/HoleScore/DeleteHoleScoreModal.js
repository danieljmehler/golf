// Library imports
import { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class DeleteHoleInfoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            round: this.props.round,
            activeItem: this.props.activeItem,
            holeinfo: ""
        };
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = () => {
        axios
            .get(this.state.activeItem.hole)
            .then(res => this.setState({ holeinfo: res.data }))
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
                    <Modal.Title>Delete Hole Score</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete score ({this.state.activeItem.score}) for Hole #{this.state.holeinfo.number} for the round from "{this.state.round.date}"?
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