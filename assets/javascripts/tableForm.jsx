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
      var newCellObject = {type: "unselected", text: "[Enter question]"} // this one is added so that any new row contains at least 1 cell
      newRowObject.columns.push(newCellObject);
    }
    this.props.addRow(newRowObject);
  },
  addColumn: function(event) {
    event.preventDefault();
    this.props.addColumn();
  },
  updateFormName: function(newText) {
    sectionToUpdate = "formName";
    this.props.updateFormElement(newText.formName, sectionToUpdate)
    console.log("updateFormContent triggered in TABLE form module: *", newText.formName, "*", sectionToUpdate);
  },
  updateFormContent: function(newText) {
    sectionToUpdate = "formContent";
    this.props.updateFormElement(newText.formContent, sectionToUpdate)
    // console.log("updateFormContent triggered in form module: *", newText.formContent, "*", sectionToUpdate);
  },


  // updateTableTitleText: function(newText){
  //   this.props.updateFormElementText(newText.text);
  // },
  updateTableElementText: function(newText, cellId, rowId) {
    this.props.updateTableElementText(newText, cellId, rowId);
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
          value={this.props.formName}
          change={this.updateFormName}
          propName="formName"
          className="table-formName"
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
