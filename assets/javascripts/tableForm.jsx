var React = require('react');
var riek = require('riek');
var RIEInput = riek.RIEInput;
var FormBank = require('./formBank.js');
var NewRow = require('./newRow.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {text: "Table"}
  },
  addRow: function(event) {
    event.preventDefault();
    var newRowObject = {columns: []};
    var numberOfColumns = this.props.tableRows[0].columns.length
    for (var i = 0; i < numberOfColumns; i++) {
      var newCellObject = {type: "unselected", text: "[Enter question]"} // this one is added so that any new row contains at least 1 cell
      newRowObject.columns.push(newCellObject);
    }
    this.props.addRow(newRowObject);
  },
  addColumn: function(event) {
    event.preventDefault();
    this.props.addColumn();
  },
  updateTableElementText: function(newText, cellId, rowId) {
    this.props.updateTableElementText(newText, cellId, rowId);
  },
  updateTableTitleText: function(newText){
    this.props.updateFormElementText(newText.text);
  },
  render: function() {
    var columnHeaders = [];
    var rows = [];

    for (var i = 0; i < this.props.tableRows.length; i++) {
      rows.push(<NewRow id={i} key={i} element={this.props.tableRows[i]} columns={this.props.tableRows[i].columns} changeCellToForm={this.props.changeCellToForm} updateElementText={this.updateTableElementText}/>);
    }

    for (var i = 0; i < this.props.tableRows[0].columns.length; i++) {
      columnHeaders.push(<th key={i}> Column {i+1} </th>);
    }
    return(
      <div id="table-form">
        <RIEInput
          value={this.props.text}
          change={this.updateTableTitleText}
          propName="text"
          className="form-question-header"
        />
        <button id="add-column-button" onClick={this.addColumn}>Add Column</button>
        <form>
          <table>
            <thead>
              <tr>
                {columnHeaders}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </form>
        <button onClick={this.addRow} value="NewRow">Add Row</button>
      </div>
    )
  }
});
