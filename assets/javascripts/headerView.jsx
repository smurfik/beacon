var React = require('react');
    // riek = require('riek'),
    // RIEInput = riek.RIEInput,
    // sectionToUpdate;

module.exports = React.createClass({
  // getInitialState: function() {
  //   // return({type: "Header", text: "Header"});
  // },
  // updateFormContent: function(newText) {
  //   sectionToUpdate = "formContent";
  //   this.props.updateFormElement(newText.formContent, sectionToUpdate)
  // },
  logInput: function(event) {
    console.log(event.target.value)
  },
  render: function() {
    return(
      <div className="header-view">
        <h1>{this.props.formContent}</h1>
      </div>
    )
  }
});
