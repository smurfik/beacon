var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    sectionToUpdate;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "UserText", text: "answer here"});
  },
  updateFormName: function(newText) {
    sectionToUpdate = "formName";
    this.props.updateFormElement(newText.formName, sectionToUpdate)
    // console.log("updateFormContent triggered in form module: *", newText.formName, "*", sectionToUpdate);
  },
  updateFormContent: function(newText) {
    sectionToUpdate = "formContent";
    this.props.updateFormElement(newText.formContent, sectionToUpdate)
    // console.log("updateFormContent triggered in form module: *", newText.formContent, "*", sectionToUpdate);
  },
  render: function() {
    return(
      <div id="user-text-form">
        <RIEInput
          value={this.props.formName}
          change={this.updateFormName}
          propName="formName"
          className="userText-formName"
          />
        <RIEInput
          value={this.props.formContent}
          change={this.updateFormContent}
          propName="formContent"
          className="userText-formContent"
          />
      </div>
    )
  }
});
