var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "UserText", text: "answer here"});
  },
  updateFormName: function(newText) {
    this.props.updateFormName(newText.formName);
  },
  updateFormContent: function(newText) {
    this.props.updateFormContent(newText.formContent);
    // console.log("updateFormContent triggered in form module: *", newText.formContent, "*");
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
