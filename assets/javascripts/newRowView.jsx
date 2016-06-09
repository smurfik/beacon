var React         = require('react'),
    ViewBank      = require('./viewBank.js'),
    TableCellView = require('./tableCellView.jsx');

module.exports = React.createClass({
  render: function() {
    var columns = [],
        i;

    for (i = 0; i < this.props.columns.length; i++) {
      var questionId = this.props.columns[i].questionId;
      columns.push(
        <TableCellView
          id           = {i}
          key          = {i}
          element      = {this.props.columns[i]}
          type         = {this.props.columns[i].type}
          questionId   = {questionId}
          formTitle    = {this.props.columns[i].formTitle}
          formContent  = {this.props.columns[i].formContent}
          updateAnswer = {this.props.updateAnswer}
          answer       = {this.props.previewAnswers[questionId]}
        />
      )
    }

    return(
      <tr>
        {columns}
      </tr>
    )
  }
});
