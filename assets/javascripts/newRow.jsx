var React     = require('react'),
    riek      = require('riek'),
    RIEInput  = riek.RIEInput,
    FormBank  = require('./formBank.js'),
    TableCell = require('./tableCell.jsx');

module.exports = React.createClass({
  changeCellToForm: function(cellType, cellId) {
    var rowId = this.props.id
    this.props.changeCellToForm(cellType, cellId, rowId);
  },
  updateFormElement: function(newText, cellId) {
    var rowId = this.props.id
    this.props.updateFormElement(newText, cellId, rowId);
  },
  render: function() {
    var columns = [],
        i;

    for (i = 0; i < this.props.columns.length; i++) {
      columns.push(
        <TableCell
          id                = {i}
          key               = {i}
          element           = {this.props.columns[i]}
          type              = {this.props.columns[i].type}
          formTitle         = {this.props.columns[i].formTitle}
          formContent       = {this.props.columns[i].formContent}
          updateFormElement = {this.updateFormElement}
          changeCellToForm={this.changeCellToForm}
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
