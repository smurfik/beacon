var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    sectionToUpdate;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Dropdown", text: "Question"});
  },
  updateFormName: function(newText) {
    sectionToUpdate = "formName";
    this.props.updateFormElement(newText.formName, sectionToUpdate)
  },
  updateFormContent: function(event) {
    sectionToUpdate = "formContent";
    this.props.updateFormElement(event.target.value, sectionToUpdate)
  },
  render: function() {
    return(
      <div id="dropdown-form">
        <RIEInput
          value     = {this.props.formName}
          change    = {this.updateFormName}
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
