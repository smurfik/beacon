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
    // console.log("updateFormContent triggered in dropdown form module: *", newText.formName, "*", sectionToUpdate);
  },
  updateFormContent: function(newText) {
    sectionToUpdate = "formContent";
    this.props.updateFormElement(newText.formContent, sectionToUpdate)
    // console.log("updateFormContent triggered in dropdown form module: *", newText.formContent, "*", sectionToUpdate);
  },
  // updateElementText: function(newText) {
  //   this.props.updateElementText(newText.text);
  // },
  render: function() {
    return(
      <div id="dropdown-form">
        <RIEInput
          value     = {this.props.formName}
          change    = {this.updateFormName}
          propName  = "formName"
          className = "dropdown-formName"
        />
        <select className="dropdown-formContent">
          <option value = "value1">Value 1</option>
          <option value = "value2">Value 2</option>
        </select>
      </div>
    )
  }
});
