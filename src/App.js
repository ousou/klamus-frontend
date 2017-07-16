import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import {Tabs, Tab, LeftTabs} from 'pui-react-tabs';

const serverAddress = 'http://localhost:8080/'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: []
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
        })
  }

  handleFormSubmit(event) {
    alert('Data was submitted: ' + JSON.stringify(this.state.formData));
    event.preventDefault();
  }

  handleChange(event) {
    var id = event.target.id;
    var value = event.target.value;
    switch (id) {
      case 'name':
      this.setState({
        formData: {
          composer: value
        }
      });
        break;
      case 'composer':
        this.setState({
          formData: {
            composer: value
          }
        });
        break;
    }

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
            <form onSubmit={this.handleFormSubmit}>
               <label>
                 Levyn nimi:
                 <input id="name" type="text" value={this.state.value} onChange={this.handleChange}/>
               </label>
               <label>
                 Säveltäjä:
                 <input id="composer" type="text" value={this.state.value} onChange={this.handleChange}/>
               </label>
               <input type="submit" value="Submit" />
             </form>
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
