var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    FormBank = require('./formBank.js'),
    NewRow = require('./newRow.jsx'),
    generateQuestionId = function() {
      return Math.floor(Math.random() * (10000 - 1)) + 1;
    };

module.exports = React.createClass({
  addRow: function(event) {
    event.preventDefault();
    var newRowObject = {columns: []};
    var numberOfColumns = this.props.tableRows[0].columns.length
    for (var i = 0; i < numberOfColumns; i++) {
      var questionId = generateQuestionId();
      var newCellObject = {
        type:        "unselected",
        formTitle:   "Question",
        formContent: "[Enter question]",
        questionId: questionId
      } // this newCellObject is added so that any new row contains at least 1 cell
      newRowObject.columns.push(newCellObject);
    }
    this.props.addRow(newRowObject);
  },
  addColumn: function(event) {
    event.preventDefault();
    this.props.addColumn();
  },
  updateFormElement: function(newText, cellId, rowId) {
    if (cellId == undefined) {
      this.props.updateFormElement(newText.formTitle); // this is if we're just updating the name of the Table form
    } else {
      this.props.updateFormElement(newText, cellId, rowId) // this is if we're updating the text within a table cell
    }
  },

  render: function() {
    var columnHeaders = [],
        rows = [],
        i;

    for (i = 0; i < this.props.tableRows.length; i++) {
      rows.push(
        <NewRow
          id={i}
          key={i}
          element={this.props.tableRows[i]}
          columns={this.props.tableRows[i].columns}
          changeCellToForm={this.props.changeCellToForm}
          updateFormElement={this.props.updateFormElement}
        />
      );
    }

    for (i = 0; i < this.props.tableRows[0].columns.length; i++) {
      columnHeaders.push(<th key={i}> Column {i+1} </th>);
    }
    return(
      <div className="table-form">
        <RIEInput
          value     = {this.props.formTitle}
          change    = {this.updateFormElement}
          propName  = "formTitle"
          className = "table-formTitle"
        />
      <button className="add-column-button" onClick={this.addColumn}>Add Column</button>
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
