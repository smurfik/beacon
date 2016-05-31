var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    FormBank = require('./formBank.js');

module.exports = React.createClass({
  updateFormElement: function(newText, sectionToUpdate, cellId, rowId) {
    var formElementId = this.props.id;
    if (cellId == undefined) { //i.e. if we are updating the text of a standard form element in builder, not a tableCell, which is form within a Table
      this.props.updateFormElement(newText, formElementId, sectionToUpdate);
    } else {
      this.props.updateTableFormElement(newText, cellId, rowId, formElementId, sectionToUpdate);
    }
  },
  deleteElement: function(event, id) {
    event.preventDefault();
    this.props.deleteElement(this.props.id);
  },
  moveElementUp: function(event, id) {
    event.preventDefault();
    this.props.moveElementUp(this.props.id);
  },
  moveElementDown: function(event, id) {
    event.preventDefault();
    this.props.moveElementDown(this.props.id);
  },
  addRow: function(newRowObject) {
    this.props.addRow(newRowObject, this.props.id);
  },
  addColumn: function() {
    this.props.addColumn(this.props.id);
  },
  changeCellToForm: function(cellType, cellId, rowId) {
    var tableId = this.props.id // keep this var declaration here so that it's clear in the next line which table component this.props.id refers to?
    this.props.changeCellToForm(cellType, cellId, rowId, tableId);
  },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(
        FormBank["Table"], {
          text: this.props.text,
          updateTableElementText: this.updateElementText,
          updateFormElementText: this.updateElementText,
          addRow: this.addRow,
          tableRows: this.props.tableRows,
          addColumn: this.addColumn,
          changeCellToForm: this.changeCellToForm
        }
      );
    } else {
      element = React.createElement(
        FormBank[this.props.element.type], {
          formName:          this.props.formName,
          formContent:       this.props.formContent,
          updateFormElement: this.updateFormElement
        }
      );
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
