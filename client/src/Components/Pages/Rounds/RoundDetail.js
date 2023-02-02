// Library imports
import { Component } from 'react';
import { useLocation, useParams } from "react-router-dom"
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// Local imports
import AddEditHoleScoreModal from '../HoleScore/AddEditHoleScoreModal';
import DeleteHoleScoreModal from '../HoleScore/DeleteHoleScoreModal';


class RoundDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: "",
            tee: "",
            golfer: "",
            holes: [],
            hole_info: [],
            id: props.params.roundId,
            round: {
                golfer: "",
                course: "",
                tee: "",
                date: "",
                holes: []
            },
            activeItem: { // HoleScore
                hole: "",
                score: "",
                round: ""
            }
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        let { round, tee, course, golfer, holes, hole_info } = this.state;
        axios
            .get(`http://localhost:8000/rounds/${this.state.id}/`)
            .then(res => {
                round = res.data;
                return Promise.all([]);
            })
            .then(res => axios.get(round.golfer, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            }))
            .then(res => {
                golfer = res.data;
                return Promise.all([]);
            })
            .then(res => axios.get(round.tee))
            .then(res => {
                tee = res.data;
                return Promise.all([]);
            })
            .then(res => axios.get(tee.course))
            .then(res => {
                course = res.data;
                return Promise.all([]);
            })
            .then(res => {
                let promises = [];
                round.holes.forEach((hole) => {
                    promises.push(axios.get(hole));
                });
                return Promise.all(promises);
            })
            .then(res => {
                holes = res.map(hole => hole.data);
                return Promise.all([]);
            })
            .then(res => {
                let promises = [];
                holes.forEach((hole) => {
                    promises.push(axios.get(hole.hole));
                });
                return Promise.all(promises);
            })
            .then(res => {
                hole_info = res.map(hole => hole.data);
                return Promise.all([]);
            })
            .then(res => this.setState({
                round: round,
                golfer: golfer,
                tee: tee,
                course: course,
                holes: holes,
                hole_info: hole_info
            }))
            .catch(err => console.log(err));
    }

    toggleAddEditHoleScoreModal = () => {
        this.setState({ addEditHoleScoreModal: !this.state.addEditHoleScoreModal });
    }

    toggleDeleteHoleScoreModal = () => {
        this.setState({ deleteHoleScoreModal: !this.state.deleteHoleScoreModal });
    }

    handleHoleScoreSubmit = item => {
        this.toggleAddEditHoleScoreModal();
        if (item.id) {
            axios
                .put(`http://localhost:8000/hole_scores/${item.id}/`, item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        } else {
            axios
                .post("http://localhost:8000/hole_scores/", item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshList())
                .catch(err => console.log(err));
        }
    }

    handleHoleScoreDelete = item => {
        this.toggleDeleteHoleScoreModal();
        axios
            .delete(`http://localhost:8000/hole_scores/${item.id}/`, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => this.refreshList())
            .catch(err => console.log(err));
    }

    createHoleScore = () => {
        const item = {
            hole: "",
            round: this.state.round.url,
            score: ""
        };
        this.setState({
            activeItem: item,
            addEditHoleScoreModal: !this.state.addEditHoleScoreModal
        });
    }

    renderTableScoreRow = hole => {
        const holeinfo = this.state.hole_info.find(holeinfo => holeinfo.url === hole.hole);
        return (
            <td
                key={hole.id}
                className={hole.score < holeinfo.par ? 'table-success' : hole.score > holeinfo.par ? 'table-danger' : ''}>
                {hole.score}
            </td>
        );
    }

    renderTableBody = () => {
        return (
            <tbody>
                <tr
                    key="yds">
                    <th>YDS</th>
                    {this.state.hole_info.map(hole =>
                        <td
                            key={hole.id}>
                            {hole.yards}
                        </td>
                    )}
                </tr>
                <tr key="par">
                    <th>PAR</th>
                    {this.state.hole_info.map(hole =>
                        <td
                            key={hole.id}>
                            {hole.par}
                        </td>
                    )}
                </tr>
                <tr key="hcp">
                    <th>HCP</th>
                    {this.state.hole_info.map(hole =>
                        <td
                            key={hole.id}>
                            {hole.handicap}
                        </td>
                    )}
                </tr>
                <tr
                    key={this.state.golfer.id}>
                    <th>{this.state.golfer.username}</th>
                    {this.state.holes.map((hole) =>
                        this.renderTableScoreRow(hole)
                    )}
                </tr>
            </tbody>
        );
    }

    render() {
        return (
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item
                        href="/rounds">
                        Rounds
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        active>
                        {this.state.round.date}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <h1 className='text-center'>{this.state.golfer.username}</h1>
                        <h1 className='text-center'>{this.state.course.name}</h1>
                        <h2 className='text-center'>{this.state.tee.name} Tees</h2>
                        <h3 className='text-center'>{this.state.round.date}</h3>
                    </Col>
                    <Col md="2"></Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Table
                            responsive
                            bordered
                            className="text-center">
                            <thead>
                                <tr>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={this.createHoleScore}>
                                            Add Hole Score
                                        </Button>
                                    </td>
                                    {this.state.holes.map((hole) =>
                                        <td
                                            key={hole.id}>
                                            <ButtonGroup vertical>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => this.setState({ activeItem: hole, addEditHoleScoreModal: !this.state.addEditHoleScoreModal })}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => this.setState({ activeItem: hole, deleteHoleScoreModal: !this.state.deleteHoleScoreModal })}>
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    )}
                                </tr>
                                <tr>
                                    <th>Hole</th>
                                    {this.state.hole_info.map((hole_info) =>
                                        <th
                                            key={hole_info.id}>
                                            {hole_info.number}
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            {this.renderTableBody()}
                        </Table>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditHoleScoreModal ? (
                    <AddEditHoleScoreModal
                        activeItem={this.state.activeItem}
                        round={this.state.round}
                        toggle={this.toggleAddEditHoleScoreModal}
                        show={this.state.addEditHoleScoreModal}
                        onSubmit={this.handleHoleScoreSubmit}
                    />
                ) : null}
                {this.state.deleteHoleScoreModal ? (
                    <DeleteHoleScoreModal
                        activeItem={this.state.activeItem}
                        round={this.state.round}
                        toggle={this.toggleDeleteHoleScoreModal}
                        show={this.state.deleteHoleScoreModal}
                        onSubmit={this.handleHoleScoreDelete}
                    />
                ) : null}
            </Container>
        );
    }
}

const Fn = (props) => {
    const params = useParams();
    const location = useLocation();

    return (
        <RoundDetail
            {...props}
            params={params}
            location={location}
        />);
}

export default Fn;