// Library imports
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


class AddEditHoleInfoModal extends Component {

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
                    <Modal.Title>Add Hole Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Hole Number</Form.Label>
                            <Form.Control
                                autoFocus
                                type="number"
                                name="number"
                                value={this.state.activeItem.number}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Par</Form.Label>
                            <Form.Control
                                type="number"
                                name="par"
                                value={this.state.activeItem.par}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Handicap</Form.Label>
                            <Form.Control
                                type="number"
                                name="handicap"
                                value={this.state.activeItem.handicap}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Yards</Form.Label>
                            <Form.Control
                                type="number"
                                name="yards"
                                value={this.state.activeItem.yards}
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

export default AddEditHoleInfoModal;