var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    sectionToUpdate;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Dropdown", text: "Question"});
  },
  updateFormElement: function(newText) {
    this.props.updateFormElement(newText.formName);
  },
  updateFormContent: function(event) {
    // This function should evolve as we change this element FROM a
    // selectable dropdown TO a form where admin enters the values they
    // want to appear in the user-facing dropdown
  },
  render: function() {
    return(
      <div className="dropdown-form">
        <RIEInput
          value     = {this.props.formName}
          change    = {this.updateFormElement}
          propName  = "formName"
          className = "dropdown-formName"
        />
        <select className="dropdown-formContent" onChange={this.updateFormContent} value={this.props.formContent}>
          <option value = "response" > [select] </option>
          <option value = "Option A" > Option A </option>
          <option value = "Option A" > Option B </option>
        </select>
      </div>
    )
  }
});
