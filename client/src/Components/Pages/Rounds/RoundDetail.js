import { Component } from 'react';
import { useLocation, useParams } from "react-router-dom"
import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AddEditHoleScoreModal from '../HoleScore/AddEditHoleScoreModal'
import DeleteHoleScoreModal from '../HoleScore/DeleteHoleScoreModal'


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
        this.refreshList()
    }

    refreshList = () => {
        let round = this.state.round;
        let tee = this.state.tee;
        let course = this.state.course;
        let golfer = this.state.golfer;
        let holes = this.state.holes;
        let hole_info = this.state.hole_info;
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
                golfer = res.data
                return Promise.all([])
            })
            .then(res => axios.get(round.tee))
            .then(res => {
                tee = res.data;
                return Promise.all([])
            })
            .then(res => axios.get(tee.course))
            .then(res => {
                course = res.data
                return Promise.all([])
            })
            .then(res => {
                let promises = []
                round.holes.forEach((hole) => {
                    promises.push(axios.get(hole))
                });
                return Promise.all(promises)
            })
            .then(res => {
                holes = res.map(hole => hole.data)
                return Promise.all([])
            })
            .then(res => {
                let promises = []
                holes.forEach((hole) => {
                    promises.push(axios.get(hole.hole))
                });
                return Promise.all(promises)
            })
            .then(res => {
                hole_info = res.map(hole => hole.data)
                return Promise.all([])
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
    };

    toggleAddEditHoleScoreModal = () => {
        this.setState({ addEditHoleScoreModal: !this.state.addEditHoleScoreModal });
    };

    toggleDeleteHoleScoreModal = () => {
        this.setState({ deleteHoleScoreModal: !this.state.deleteHoleScoreModal });
    };

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
    };

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
    };

    createHoleScore = () => {
        const item = { hole: "", round: this.state.round.url, score: "" };
        this.setState({ activeItem: item, addEditHoleScoreModal: !this.state.addEditHoleScoreModal });
    };

    renderTableRowDetails = (hole) => {
        const hi = this.state.hole_info.filter(hi => hi.url === hole.hole)[0]
        return (<>
            <td>{hi.number}</td>
            <td>{hi.par}</td>
            <td>{hi.yards}</td>
            <td>{hi.handicap}</td>
            <td className={hole.score < hi.par ? 'table-success' : hole.score > hi.par ? 'table-danger' : ''}>{hole.score}</td>
        </>)
    }

    renderTableRow = () => {
        return this.state.holes.map((hole) => (
            <tr key={hole.id}>
                {this.renderTableRowDetails(hole)}
            </tr>
        ));
    };

    render() {
        return (
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href="/rounds">Rounds</Breadcrumb.Item>
                    <Breadcrumb.Item active>{this.state.round.date}</Breadcrumb.Item>
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
                        <Table striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                    <td>
                                        <Button onClick={this.createHoleScore} variant="primary">
                                            Add Hole
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Hole</th>
                                    <th>Par</th>
                                    <th>Yards</th>
                                    <th>Handicap</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableRow()}
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditHoleScoreModal ? (
                    <AddEditHoleScoreModal
                        activeItem={this.state.activeItem}
                        round={this.state.round}
                        toggle={this.toggleAddEditHoleScoreModal}
                        onSubmit={this.handleHoleScoreSubmit}
                        show={this.state.addEditHoleScoreModal}
                    />
                ) : null}
                {this.state.deleteHoleScoreModal ? (
                    <DeleteHoleScoreModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleDeleteHoleScoreModal}
                        onSubmit={this.handleHoleScoreDelete}
                        show={this.state.deleteHoleScoreModal}
                    />
                ) : null}
            </Container>
        );
    };
}

const Fn = (props) => {
    const params = useParams()
    const location = useLocation()
    return (
        <RoundDetail
            {...props}
            params={params}
            location={location}
        />);
};
export default Fn;