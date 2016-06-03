var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    ViewBank = require('./viewBank.js');

module.exports = React.createClass({
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
          answer:            this.props.answer,
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
