import React from "react";
// @material-ui/core components
import API from '../../providers/API';
import { GET_AIRPORTS } from '../../variables/urls';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import CustomAlert from "components/Snackbar/CustomAlert.js";
import { Card, CardBody, CardTitle } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search }  from 'react-bootstrap-table2-toolkit';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columns = [{
  dataField: 'iata',
  text: 'IATA',
  style: { cursor: 'pointer' }
}, {
  dataField: 'name',
  text: 'Nombre',
  style: { cursor: 'pointer' }
}, {
  dataField: 'countryName',
  text: 'Pais',
  style: { cursor: 'pointer' }
}];
const { SearchBar } = Search;

const tableRowEvents = {
  onClick: (e, row) => {
    let win = window.open("/entity/"+row.iata, "_blank");
    win.focus();
  },
}

export default class Datos extends React.Component {

  constructor(props) {
    super(props);
    this.state = { airports: [], error: false , loading : false};
  }
  
  componentDidMount() {
    this.setState({ loading: true })
    API.get(GET_AIRPORTS)
      .then(res => {

        this.setState({ airports: res.data });
        this.setState({ loading: false });

      })
      .catch(() => { this.setState({ error: true }) })
  }
 
 componentWillUnmount(){
  console.log("component will unmount");
  this.setState({ airports: [] });
  this.setState({ loading: true });
 }
  centralComponent = () => {

    if (this.state.loading ) {
      return <ClipLoader color="ffffff" loading="true" css={override} size={150} />
    }
    else {
      if (this.state.error) {
        return <><CustomAlert mensaje={'Error - Tuvimos un problema conectandonos con el servidor. Por favor intente más tarde'} close color="danger" />
          <br /></>
      }
      if (this.state.airports && this.state.airports.length > 0) {
        return (
          <div>

            <ToolkitProvider
              keyField="id"
              data={ this.state.airports  }
              columns={ columns }
             
              search
            >
              
              {
                props => (
                  <div>
                    <p>Buscar:</p>
                    <SearchBar { ...props.searchProps } />
                    <hr />
                    <BootstrapTable
                      { ...props.baseProps }
                      pagination={ paginationFactory() }
                      hover
                      rowEvents={ tableRowEvents }
                    />
                  </div>
                )
              }
            </ToolkitProvider>
          </div>
        )
      }

    }
  }
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">AirportData</CardTitle>
            {this.centralComponent()}
          </CardBody>
        </Card>
      </div>
    );
  }
}
