var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "UserText", text: "answer here"});
  },
  updateFormElement: function(newText) {
    this.props.updateFormElement(newText.formTitle);
  },
  render: function() {
    return(
      <div className="userText-form">
        <RIEInput
          value     = {this.props.formTitle}
          change    = {this.updateFormElement}
          propName  = "formTitle"
          className = "userText-formTitle"
        />
        <span className="form-explainer">User answers here</span>
      </div>
    )
  }
});
