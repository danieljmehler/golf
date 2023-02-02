// Library imports
import { Component } from 'react';
import { Link, useLocation, useParams } from "react-router-dom"
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// Local imports
import AddEditHoleInfoModal from "./../HoleInfo/AddEditHoleInfoModal";
import DeleteHoleInfoModal from "./../HoleInfo/DeleteHoleInfoModal";


class TeeDetail extends Component {

    constructor(props) {
        super(props);

        const course = props.location.state ? props.location.state.course : "";
        const tee = props.location.state ?
            props.location.state.tee : {
                name: "",
                course: "",
                holes: []
            };

        this.state = {
            course: course,
            id: props.params.teeId,
            tee: tee,
            holes: [],
            activeItem: {  // HoleInfo
                number: "",
                tee: {},
                par: "",
                handicap: "",
                yards: "",
                scores: [] // HoleScore
            }
        };
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData = (force = false) => {
        this.refreshTee(force)
            .then(res => this.refreshHoles(res))
            .catch(err => console.log(err));
    }

    /**
     * TODO:
     * This method is "async" because it always returns a Promise.
     * But do we need to bind it to "this"? Doesn't appear so, because
     * we can call it as "this.refreshX()" from this.refreshData().
     * 
     * @returns Empty Promise if referred from app, otherwise, return this.setState()
     */
    async refreshTee(force = false) {
        if (!force && this.props.location.state !== null) {
            return Promise.all([]);
        }
        let tee = this.state.tee;
        return axios
            .get(`http://localhost:8000/tees/${this.state.id}`)
            .then(res => {
                tee = res.data;
                return Promise.all([]);
            })
            .then(res => axios.get(tee.course))
            .then(res => Promise.resolve({ course: res.data, tee: tee }));
    }

    refreshHoles = (stateUpdate) => {
        let holes = stateUpdate.tee ? stateUpdate.tee.holes : this.state.tee.holes;
        let promises = [];
        holes.forEach((hole) => {
            promises.push(axios.get(hole));
        });
        Promise
            .all(promises)
            .then(res => this.setState({ 
                ...stateUpdate,
                holes: res.map(hole => hole.data)
            }))
            .catch(err => console.log(err));
    }

    toggleAddEditHoleInfoModal = () => {
        this.setState({ addEditHoleInfoModal: !this.state.addEditHoleInfoModal });
    }

    toggleDeleteHoleInfoModal = () => {
        this.setState({ deleteHoleInfoModal: !this.state.deleteHoleInfoModal });
    }

    createHoleInfo = tee => {
        const item = {
            number: "",
            tee: tee.id,
            par: "",
            handicap: "",
            yards: "",
            scores: []
        };
        this.setState({
            activeItem: item,
            addEditHoleInfoModal: !this.state.addEditHoleInfoModal
        });
    }

    handleHoleInfoSubmit = item => {
        item.tee = this.state.tee.url;
        this.toggleAddEditHoleInfoModal();
        if (item.id) {
            axios
                .put(`http://localhost:8000/hole_info/${item.id}/`, item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshData(true))
                .catch(err => console.log(err));
        } else {
            axios
                .post("http://localhost:8000/hole_info/", item, {
                    auth: {
                        username: "admin",
                        password: "admin"
                    }
                })
                .then(res => this.refreshData(true))
                .catch(err => console.log(err));
        }
    }

    handleHoleInfoDelete = item => {
        this.toggleDeleteHoleInfoModal();
        axios
            .delete(`http://localhost:8000/hole_info/${item.id}/`, {
                auth: {
                    username: "admin",
                    password: "admin"
                }
            })
            .then(res => this.refreshData(true))
            .catch(err => console.log(err));
    }

    renderHoleInfoListItem = () => {
        return this.state.holes.map((holeinfo) =>
            <ListGroup.Item
                key={holeinfo.id}
                className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <Link
                            to={`/hole_info/${holeinfo.id}`}
                            state={{
                                course: this.state.course,
                                tee: this.state.tee,
                                holeinfo: holeinfo
                            }}>
                            Hole {holeinfo.number}
                        </Link>
                    </div>
                </div>

                <ButtonGroup>
                    <Button
                        variant="primary"
                        onClick={() => this.setState({ activeItem: holeinfo, addEditHoleInfoModal: !this.state.addEditHoleInfoModal })}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => this.setState({ activeItem: holeinfo, deleteHoleInfoModal: !this.state.deleteHoleInfoModal })}>
                        Delete
                    </Button>
                </ButtonGroup>
            </ListGroup.Item >
        );
    }

    render() {
        return (
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item
                        href="/courses">
                        Courses
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        href={`/courses/${this.state.course.id}`}>
                        {this.state.course.name}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        active>
                        {this.state.tee.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <h1 className='text-center'>{this.state.course.name}</h1>
                        <h2 className='text-center'>{this.state.tee.name} Tees</h2>
                        <h3 className='text-center'>Holes</h3>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <ListGroup>
                            <ListGroup.Item>
                                <Button
                                    variant="primary"
                                    onClick={this.createHoleInfo}>
                                    Add Hole
                                </Button>
                            </ListGroup.Item>
                            {this.renderHoleInfoListItem()}
                        </ListGroup>
                    </Col>
                    <Col md="3"></Col>
                </Row>
                {this.state.addEditHoleInfoModal ? (
                    <AddEditHoleInfoModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggleAddEditHoleInfoModal}
                        show={this.state.addEditHoleInfoModal}
                        onSubmit={this.handleHoleInfoSubmit}
                    />
                ) : null}
                {this.state.deleteHoleInfoModal ? (
                    <DeleteHoleInfoModal
                        activeItem={this.state.activeItem}
                        tee={this.state.tee}
                        toggle={this.toggleDeleteHoleInfoModal}
                        show={this.state.deleteHoleInfoModal}
                        onSubmit={this.handleHoleInfoDelete}
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
        <TeeDetail
            {...props}
            params={params}
            location={location}
        />);
}

export default Fn;