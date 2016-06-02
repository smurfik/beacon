var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Description", text: "enter description here"});
  },
  updateFormElement: function(newText) {
    this.props.updateFormElement(newText.formTitle);
  },
  render: function() {
    return(
      <div className="description-form">
        <RIEInput
          value     = {this.props.formTitle}
          change    = {this.updateFormElement}
          propName  = "formTitle"
          className = "description-formTitle"
        />
      </div>
    )
  }
});
