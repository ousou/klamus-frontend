import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import {Tabs, Tab, LeftTabs} from 'pui-react-tabs';
import 'purecss/build/pure-min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const serverAddress = 'http://localhost:8080/'

class RecordFormInput extends Component {
  render() {
    return (
      <div className="pure-control-group">
        <label>
         {this.props.label}
         <input
          id={this.props.id}
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.formData[this.props.id]}
          onChange={this.props.onChange}/>
        </label>
      </div>
    );
  }
}

class RecordForm extends Component {
  render() {
    return (
      <form className="pure-form pure-form-stacked record-form" onSubmit={this.props.handleFormSubmit}>
        <fieldset>
          <RecordFormInput
            label="Levyn nimi"
            id="name"
            placeholder="Levyn nimi"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Kuvaus"
            id="description"
            placeholder="Yleiskuvaus levystä"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Hyllypaikka"
            id="storage_place"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Alihyllypaikka"
            id="sub_storage_place"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Säveltäjä"
            id="composer"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Levyn kunto"
            id="condition"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Levykoodi"
            id="code"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Levy-yhtiö"
            id="record_label"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Levytyyppi"
            id="record_type"
            placeholder="LP"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Julkaisuvuosi"
            id="year"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <RecordFormInput
            label="Lisätiedot"
            id="extra_info"
            formData={this.props.formData}
            onChange={this.props.handleChange}
          />
          <div className="pure-control-group">
            <button type="submit" className="pure-button pure-button-primary">Tallenna</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

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
