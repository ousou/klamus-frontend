import React, { Component } from 'react';
import 'purecss/build/pure-min.css';

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

export default RecordForm;
