var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    sectionToUpdate;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Header", text: "Header"});
  },
  updateFormContent: function(newText) {
    sectionToUpdate = "formContent";
    this.props.updateFormElement(newText.formContent, sectionToUpdate)
  },
  render: function() {
    return(
      <div className="header-form">
        <RIEInput
          value     = {this.props.formContent}
          change    = {this.updateFormContent}
          propName  = "formContent"
          className = "header-formContent"
        />
      </div>
    )
  }
});
