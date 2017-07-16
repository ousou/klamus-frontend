import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class App extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="header">
          <h2>Klassisen musiikin levytietokanta</h2>
        </div>
        <div className="content">
          <h3>Säveltäjät</h3>
          <ReactTable className="content-table"
    				data={getComposers()}
    				columns={composerColumns}
    			/>
        </div>
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

function getComposers() {
  return [
   {
      "composerId":1,
      "lastName":"Beethoven",
      "firstNames":"Ludwig van",
      "info":"Info info",
      "description":"Saksalainen säveltäjä",
      "yearOfBirth":1770,
      "yearOfDeath":1827
   },
   {
      "composerId":2,
      "lastName":"Sibelius",
      "firstNames":"Jean",
      "info":null,
      "description":"Suomalainen säveltäjä",
      "yearOfBirth":null,
      "yearOfDeath":null
   }
]
}

export default App;
