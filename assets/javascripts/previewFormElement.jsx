var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    ViewBank = require('./viewBank.js');

module.exports = React.createClass({
  // updateAnswer: function(answer, cellId, rowId) {
  //   var viewElementId = this.props.id;
  //   if (cellId == undefined) {  // if element being updated is not in a table
  //     this.props.updateAnswer(answer, viewElementId);
  //   } else {
  //     this.props.updateTableAnswer(answer, cellId, rowId, viewElementId);
  //   }
  // },
  // updateAnswer: function(answer, questionId) {
  //   this.props
  // },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(
        ViewBank["Table"], {
          formTitle:    this.props.formTitle,
          tableRows:    this.props.tableRows,
          // updateAnswer: this.updateAnswer
          updateAnswer: this.props.updateAnswer,
        }
      );
    } else {
      element = React.createElement(
        ViewBank[this.props.element.type], {
          questionId:        this.props.questionId,
          formTitle:         this.props.formTitle,
          formContent:       this.props.formContent,
          answer:            this.props.answer,
          // updateAnswer:      this.updateAnswer
          updateAnswer: this.props.updateAnswer,
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
