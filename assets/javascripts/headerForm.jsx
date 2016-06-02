var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Header", text: "Header"});
  },
  updateFormElement: function(newText) {
    this.props.updateFormElement(newText.formTitle);
  },
  render: function() {
    return(
      <div className="header-form">
        <RIEInput
          value     = {this.props.formTitle}
          change    = {this.updateFormElement}
          propName  = "formTitle"
          className = "header-formTitle"
        />
      </div>
    )
  }
});
