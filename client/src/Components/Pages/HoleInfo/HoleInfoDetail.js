// Library imports
import { Component } from 'react';
import { useLocation, useParams } from "react-router-dom"
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


class HoleInfoDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: "",
            tee: "",
            id: props.params.holeInfoId,
            holeinfo: {
                number: "",
                tee: "",
                par: "",
                handicap: "",
                yards: "",
                scores: []
            }
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        let { holeinfo, tee, course } = this.state;
        axios
            .get(`http://localhost:8000/hole_info/${this.state.id}/`)
            .then(res => {
                holeinfo = res.data;
                return Promise.all([]);
            })
            .then(res => axios.get(holeinfo.tee))
            .then(res => {
                tee = res.data;
                return Promise.all([]);
            })
            .then(res => axios.get(tee.course))
            .then(res => {
                course = res.data;
                return Promise.all([]);
            })
            .then(res => this.setState({
                holeinfo: holeinfo,
                tee: tee,
                course: course
            }))
            .catch(err => console.log(err));
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
                        href={`/tees/${this.state.tee.id}`}>
                        {this.state.tee.name}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        active>
                        Hole {this.state.holeinfo.number}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <h1 className='text-center'>{this.state.course.name}</h1>
                        <h2 className='text-center'>{this.state.tee.name} Tees</h2>
                        <h3 className='text-center'>Hole #{this.state.holeinfo.number}</h3>
                    </Col>
                    <Col md="2"></Col>
                </Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Table
                        striped
                        bordered
                        hover
                        className="text-center">
                            <thead>
                                <tr>
                                    <th className="col-md-4">Par</th>
                                    <th className="col-md-4">Yards</th>
                                    <th className="col-md-4">Handicap</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.holeinfo.par}</td>
                                    <td>{this.state.holeinfo.yards}</td>
                                    <td>{this.state.holeinfo.handicap}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="3"></Col>
                </Row>
            </Container>
        );
    }
}

const Fn = (props) => {
    const params = useParams();
    const location = useLocation();

    return (
        <HoleInfoDetail
            {...props}
            params={params}
            location={location}
        />);
}

export default Fn;