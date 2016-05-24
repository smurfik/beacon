var React = require('react');
var riek = require('riek')
var RIEInput = riek.RIEInput;
var FormBank = require('./formBank.js');

module.exports = React.createClass({
  updateElementText: function(newText, cellId, rowId) {
    var tableId = this.props.id;
    if (cellId == undefined) { //i.e. if we are updating the text of a standard form element in builder, not a tableCell, which is form within a Table
      this.props.updateFormElementText(newText, tableId);
    } else {
      this.props.updateTableElementText(newText, cellId, rowId, tableId);
    }
  },
  deleteElement: function(event, id) {
    event.preventDefault();
    var id = this.props.id;
    this.props.deleteElement(id);
  },
  moveElementUp: function(event, id) {
    event.preventDefault();
    var id = this.props.id;
    this.props.moveElementUp(id);
  },
  moveElementDown: function(event, id) {
    event.preventDefault();
    var id = this.props.id;
    this.props.moveElementDown(id);
  },
  addRow: function(newRowObject) {
    var id = this.props.id
    this.props.addRow(newRowObject, id);
  },
  addColumn: function() {
    var id = this.props.id
    this.props.addColumn(id);
  },
  changeCellToForm: function(cellType, cellId, rowId) {
    var tableId = this.props.id
    this.props.changeCellToForm(cellType, cellId, rowId, tableId);
  },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(FormBank["Table"], {text: this.props.text, updateTableElementText: this.updateElementText, updateFormElementText: this.updateElementText, addRow: this.addRow, tableRows: this.props.tableRows, addColumn: this.addColumn, changeCellToForm: this.changeCellToForm});
    } else {
      element = React.createElement(FormBank[this.props.element.type], {text: this.props.text, updateElementText: this.updateElementText});
    }
    return (
      <div className="form-element">
        {element}
        <button onClick={this.deleteElement}>Delete</button>
        <button onClick={this.moveElementUp}>Move Up</button>
        <button onClick={this.moveElementDown}>Move Down</button>
      </div>
    )
  }
});
