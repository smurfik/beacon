var React     = require('react'),
    ViewBank  = require('./viewBank.js'),
    TableCellView = require('./tableCellView.jsx');

module.exports = React.createClass({
  // updateAnswer: function(newText, cellId) {
  //   var rowId = this.props.id
  //   this.props.updateAnswer(newText, cellId, rowId);
  // },
  render: function() {
    var columns = [],
        i;

    for (i = 0; i < this.props.columns.length; i++) {
      columns.push(
        <TableCellView
          id                = {i}
          key               = {i}
          element           = {this.props.columns[i]}
          type              = {this.props.columns[i].type}
          questionId        = {this.props.columns[i].questionId}
          formTitle         = {this.props.columns[i].formTitle}
          formContent       = {this.props.columns[i].formContent}
          updateAnswer      = {this.props.updateAnswer}
        />
      )
    }
          // updateAnswer      = {this.updateAnswer}

    return(
      <tr>
        {columns}
      </tr>
    )
  }
});
