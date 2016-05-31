var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "UserText", text: "answer here"});
  },
  updateFormName: function(newText) {
    // console.log("updateFormName triggered in form module: *", newText.formName, "*");
    this.props.updateFormName(newText.formName);
  },
  // add function for:
    // updateFormContents

  render: function() {
    return(
      <div id="user-text-form">
        <RIEInput
          value={this.props.formName}
          change={this.updateFormName}
          propName="formName"
          className="userText-formName"
          />
      </div>
      // formContents RIEInput
    )
  }
});
