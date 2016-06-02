var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    ViewBank = require('./viewBank.js');

module.exports = React.createClass({
  // updateFormElement: function(newText, sectionToUpdate, cellId, rowId) {
  //   var formElementId = this.props.id;
  //   if (cellId == undefined) { //i.e. if we are updating the text of a standard form element in builder, not a tableCell, which is form within a Table
  //     this.props.updateFormElement(newText, formElementId, sectionToUpdate);
  //   } else {
  //     this.props.updateTableFormElement(newText, sectionToUpdate, cellId, rowId, formElementId);
  //   }
  // },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(
        ViewBank["Table"], {
          formTitle:  this.props.formTitle,
          tableRows: this.props.tableRows,
        }
      );
    } else {
      element = React.createElement(
        ViewBank[this.props.element.type], {
          formTitle:          this.props.formTitle,
          formContent:       this.props.formContent,
          // updateFormElement: this.updateFormElement
        }
      )
    }
    return (
      <div className="preview-form-element">
        {element}
      </div>
    )
  }
});
