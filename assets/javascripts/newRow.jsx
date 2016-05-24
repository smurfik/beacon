var React     = require('react');
var riek      = require('riek')
var RIEInput  = riek.RIEInput;
var FormBank  = require('./formBank.js');
var TableCell = require('./tableCell.jsx');

module.exports = React.createClass({
  changeCellToForm: function(cellType, cellId) {
    var rowId = this.props.id
    this.props.changeCellToForm(cellType, cellId, rowId);
  },
  updateElementText: function(newText, cellId) {
    var rowId = this.props.id
    this.props.updateElementText(newText, cellId, rowId);
  },
  render: function() {
    var columns = [];

    for (var i = 0; i < this.props.columns.length; i++) {
      columns.push(<TableCell id={i} key={i} element={this.props.columns[i]} type={this.props.columns[i].type} text={this.props.columns[i].text} changeCellToForm={this.changeCellToForm} updateElementText={this.updateElementText}/>)
    }

    return(
      <tr>
        {columns}
      </tr>
    )
  }
});
