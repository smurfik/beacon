var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    ViewBank = require('./viewBank.js');

module.exports = React.createClass({
  // updatePreviewFormElement: function() {
      // we'll need a function that passes updates in previewFormElements up to
      // parent, so that user answers can be stored and sent in JSON format.

      // the logic of this function should probably follow that in the standard
      // formElement component -- i.e. look for cell ID to see if the element
      // comes from within a table, or is a standard formElement.
  // },
  updateAnswer: function(answer, cellId, rowId) {
    var viewElementId = this.props.id;
    if (cellId == undefined) {  // if element being updated is not in a table
      console.log("triggered in previewFormElement: ", answer, viewElementId)
      this.props.updateAnswer(answer, viewElementId);
    } else {
      console.log("triggered in previewFormElement: ", answer, cellId, rowId, viewElementId)
      this.props.updateTableAnswer(answer, cellId, rowId, viewElementId);
    }
  },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(
        ViewBank["Table"], {
          formTitle: this.props.formTitle,
          tableRows: this.props.tableRows,
        }
      );
    } else {
      element = React.createElement(
        ViewBank[this.props.element.type], {
          formTitle:         this.props.formTitle,
          formContent:       this.props.formContent,
          updateAnswer:      this.updateAnswer
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
