var React     = require('react'),
    // ViewBank  = require('./viewBank.js'),
    TableCellView = require('./tableCellView.jsx');

module.exports = React.createClass({
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
          formTitle         = {this.props.columns[i].formTitle}
          formContent       = {this.props.columns[i].formContent}
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
