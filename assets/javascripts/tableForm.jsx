var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    FormBank = require('./formBank.js'),
    NewRow = require('./newRow.jsx'),
    sectionToUpdate;

module.exports = React.createClass({
  getInitialState: function() {
    return {text: "Table"}
  },
  addRow: function(event) {
    event.preventDefault();
    var newRowObject = {columns: []};
    var numberOfColumns = this.props.tableRows[0].columns.length
    for (var i = 0; i < numberOfColumns; i++) {
      var newCellObject = {
        type:        "unselected",
        formName:    "Question",
        formContent: "[Enter question]",
        testProp:    "test prop appears"
      } // this one is added so that any new row contains at least 1 cell
      newRowObject.columns.push(newCellObject);
    }
    this.props.addRow(newRowObject);
  },
  addColumn: function(event) {
    event.preventDefault();
    this.props.addColumn();
  },
  updateFormElement: function(newText, sectionToUpdate, cellId, rowId) {
    // console.log(newText, sectionToUpdate);

    // PASS UP CELL, ROW, ELEMENT ID AS WELL?

    if (sectionToUpdate == "formName") {
      // console.log("triggered in TableForm", newText, sectionToUpdate)
      this.props.updateFormElement(newText.formName, sectionToUpdate)
    } else if (sectionToUpdate == "formContent") {
      // console.log("triggered in TableForm", newText, sectionToUpdate, sectionToUpdate, cellId, rowId)
      this.props.updateFormElement(newText.formContent, sectionToUpdate)
    }
  },

  updateFormName: function(newText) {
    sectionToUpdate = "formName";
    this.props.updateFormElement(newText.formName, sectionToUpdate)
  },

  // REFACTOR THIS ONE NEXT:
  updateFormContent: function(newText) {
    sectionToUpdate = "formContent";
    this.props.updateFormElement(newText.formContent, sectionToUpdate)
    // console.log("updateFormContent triggered in form module: *", newText.formContent, "*", sectionToUpdate);
  },

  // updateTableTitleText: function(newText){
  //   this.props.updateFormElementText(newText.text);
  // },
  // updateTableElementText: function(newText, cellId, rowId) {
  //   this.props.updateTableElementText(newText, cellId, rowId);
  // },
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
          updateFormElement={this.updateFormElement}

          updateElementText={this.updateTableElementText}
        />
      );
    }

    for (i = 0; i < this.props.tableRows[0].columns.length; i++) {
      columnHeaders.push(<th key={i}> Column {i+1} </th>);
    }
    return(
      <div className="table-form">
        <RIEInput
          value     = {this.props.formName}
          change    = {this.updateFormName}
          propName  = "formName"
          className = "table-formName"
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
