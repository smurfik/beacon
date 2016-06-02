var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    sectionToUpdate;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "UserText", text: "answer here"});
  },
  updateFormElement: function(newText) {
    this.props.updateFormElement(newText.formName);
  },
  render: function() {
    return(
      <div className="userText-form">
        <RIEInput
          value     = {this.props.formName}
          change    = {this.updateFormElement}
          propName  = "formName"
          className = "userText-formName"
        />
        <span className="form-explainer">User answers here</span>
      </div>
    )
  }
});
