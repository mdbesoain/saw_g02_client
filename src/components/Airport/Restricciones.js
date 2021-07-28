import React, { Component } from 'react';
import { GET_COUNTRIES } from '../../variables/urls';
import API from '../../providers/API';
import { Row, Col } from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAlert from "components/Snackbar/CustomAlert.js";
import Moment from 'react-moment';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Restricciones extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, data: [], error: false };
    }
    componentDidMount() {

        var url = GET_COUNTRIES + `/${this.props.airport.countryCode}`;
        API.get(url)
            .then(res => {

                if (res.data != undefined) {
                    this.setState({ data: res.data });
                }
                else {
                    this.setState({ data: [] });
                }
                this.setState({ loading: false });

            })
            .catch(() => { this.setState({ error: true }) })
    }
    naatRedirect = () =>{
        let win =  window.location.href = 'https://www.cdc.gov/coronavirus/2019-ncov/lab/naats.html';
        win.focus();
   
    }
    restrictionBadge = () => {
        switch (this.state.data.borderStatus) {
            case "RESTRICTIONS": return <Chip color="primary" label={this.state.data.borderStatus} />;
            case "CLOSED": return <Chip color="secondary" label={this.state.data.borderStatus} />;
        }
    }
    testStatusBadge = () =>{
        switch (this.state.data.arrivalTestStatus.status) {
            case "NAAT": return <Chip color="primary" label={this.state.data.arrivalTestStatus.status} onClick={this.naatRedirect} />;
            case "CLOSED": return <Chip color="secondary" label={this.state.data.borderStatus} />;
        }
    }
    body = () => {
        if (this.state.loading) {
            return <ClipLoader color="ffffff" loading="true" css={override} size={50} />
        }
        else {
            if (this.state.data) {
                return (
                    <>
                        <Row>
                            <p><strong>{this.state.data.countryName}, {this.state.data.countryCode}</strong> </p>
                <p><small><strong>Ultima modificación <Moment format=" hh:mm DD/MM/YYYY">{this.state.data.lastModified}</Moment>:</strong> {Math.round(this.state.data.activeCases)} caso activos</small> </p>
                        </Row>
                        <Row>
                            <Col md="12">
                                <p><strong>Test de Ingreso</strong> {this.testStatusBadge()}</p>
                                <p dangerouslySetInnerHTML={{ __html: this.state.data.arrivalTestStatus.exceptions }}></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <p><strong>Estado Fronterizo</strong> {this.restrictionBadge()}</p>
                                <p dangerouslySetInnerHTML={{ __html: this.state.data.borderStatusData.exceptions }}></p>
                            </Col>
                        </Row>
                    </>
                )
            }
            else if (this.state.error) {
                return <><CustomAlert mensaje={'Error - Tuvimos un problema conectandonos con el servidor. Por favor intente más tarde'} close color="danger" />
                    <br /></>
            }
        }
    }

    render() {
        return (this.body());
    }
}

export default Restricciones;