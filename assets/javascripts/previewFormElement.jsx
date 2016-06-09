var React    = require('react'),
    riek     = require('riek'),
    RIEInput = riek.RIEInput,
    ViewBank = require('./viewBank.js');

module.exports = React.createClass({
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(
        ViewBank["Table"], {
          formTitle:       this.props.formTitle,
          tableRows:       this.props.tableRows,
          updateAnswer:    this.props.updateAnswer,
          previewAnswers:  this.props.previewAnswers
        }
      );
    } else {
      element = React.createElement(
        ViewBank[this.props.element.type], {
          questionId:   this.props.questionId,
          formTitle:    this.props.formTitle,
          formContent:  this.props.formContent,
          answer:       this.props.answer,
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
