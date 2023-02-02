// Library imports
import { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


class AddEditHoleScoreModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            round: this.props.round,
            tee: "",
            holes: []
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        let tee = this.state.tee;
        axios
            .get(this.state.round.tee)
            .then(res => {
                tee = res.data;
                return Promise.all([]);
            })
            .then(res => {
                let promises = [];
                tee.holes.forEach((hole) => {
                    promises.push(axios.get(hole));
                });
                return Promise.all(promises);
            })
            .then(res => this.setState({
                tee: tee,
                holes: res.map(hole => hole.data)
            }))
            .catch(err => console.log(err));
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
                    <Modal.Title>Add Hole Score</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Group>
                                <Form.Label>Hole</Form.Label>
                                <Form.Select
                                    autoFocus
                                    name="hole"
                                    value={this.state.activeItem.hole}
                                    onChange={this.handleChange}>
                                    <option>Select Hole</option>
                                    {this.state.holes.map((hole) =>
                                        <option
                                            key={hole.id}
                                            value={hole.url}>
                                            Hole #{hole.number}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                type="number"
                                name="score"
                                value={this.state.activeItem.score}
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

export default AddEditHoleScoreModal;