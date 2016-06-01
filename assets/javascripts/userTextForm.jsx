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
    // this.props.updateFormElement(newText.formName, sectionToUpdate)
    console.log("updateFormName triggered in USERTEXT module: *", newText.formName, "*", sectionToUpdate);
  },
  updateFormContent: function(newText) {
    sectionToUpdate = "formContent";
    // this.props.updateFormElement(newText.formContent, sectionToUpdate)
    console.log("updateFormContent triggered in USERTEXT module: *", newText.formContent, "*", sectionToUpdate);
  },
  render: function() {
    return(
      <div className="userText-form">
        <RIEInput
          value     = {this.props.formName}
          change    = {this.updateFormName}
          propName  = "formName"
          className = "userText-formName"
        />
        <RIEInput
          value     = {this.props.formContent}
          change    = {this.updateFormContent}
          propName  = "formContent"
          className = "userText-formContent"
        />
      </div>
    )
  }
});
