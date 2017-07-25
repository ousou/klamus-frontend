import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import {Tabs, Tab, LeftTabs} from 'pui-react-tabs';
import 'purecss/build/pure-min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import RecordForm from './components/RecordForm'

const serverAddress = 'http://localhost:8080/'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    var th = this;
    this.serverRequest =
      axios.get(serverAddress + 'composer/')
        .then(function(result) {
          th.setState({
            data: result.data
          });
        }).catch(function (error) {
            alert('Could not get data from server: ' + error);
        });
  }

  handleFormSubmit(event) {
    alert('Data was submitted: ' + JSON.stringify(this.state.formData));
    this.setState({
      formData: {}
    });
    event.preventDefault();
  }

  handleChange(event) {
    var id = event.target.id;
    var value = event.target.value;

    var newFormDataObject = JSON.parse(JSON.stringify(this.state.formData))
    newFormDataObject[id] = value;
    this.setState({
      formData: newFormDataObject
    });
  }

  render() {
    return (
      <div className="main-container">
        <header className="header">
          <h2>Klassisen musiikin levytietokanta</h2>
        </header>
        <Tabs className="tab-container" defaultActiveKey={1}>

          <Tab eventKey={1} title="Säveltäjät">
            <div>
              <h3>Säveltäjät</h3>
              <ReactTable className="content-table"
                data={this.state.data}
                columns={composerColumns}
              />
            </div>
          </Tab>
          <Tab eventKey={2} title="Syötä uusi levy">
            <h3>Syötä uusi levy</h3>
            <RecordForm
              formData={this.state.formData}
              handleFormSubmit={this.handleFormSubmit}
              handleChange={this.handleChange}
            />
          </Tab>
        </Tabs>
      </div>

    );
  }
}

const composerColumns = [{
  columns: [{
    Header: 'Id',
    accessor: 'composerId',
    show: false
  },{
    Header: 'Etunimet',
    accessor: 'firstNames'
  }, {
    Header: 'Sukunimi',
    id: 'lastName',
    accessor: 'lastName'
  }, {
    Header: 'Syntymävuosi',
    accessor: 'yearOfBirth'
  }, {
    Header: 'Kuolinvuosi',
    accessor: 'yearOfDeath'
  }, {
    Header: 'Lisätiedot',
    accessor: 'description'
  }]
}]


export default App;
