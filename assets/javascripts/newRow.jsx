var React     = require('react'),
    riek      = require('riek'),
    RIEInput  = riek.RIEInput,
    FormBank  = require('./formBank.js'),
    TableCell = require('./tableCell.jsx'),
    sectionToUpdate;

module.exports = React.createClass({
  changeCellToForm: function(cellType, cellId) {
    var rowId = this.props.id
    this.props.changeCellToForm(cellType, cellId, rowId);
  },
  updateFormElement: function(newText, sectionToUpdate, cellId) {
    var rowId = this.props.id
    console.log("triggered in NewRow, ", newText, sectionToUpdate, cellId, rowId);
    // this.props.updateElementText(newText, sectionToUpdate, cellId, rowId);
    this.props.updateFormElement(newText, sectionToUpdate, cellId, rowId);
  },
  // updateElementText: function(newText, cellId) {
  //   var rowId = this.props.id
  //   this.props.updateElementText(newText, cellId, rowId);
  // },
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
          formName          = {this.props.columns[i].formName}
          formContent       = {this.props.columns[i].formContent}
          updateFormName    = {this.updateFormElement}
          updateFormContent = {this.updateFormElement}

          changeCellToForm={this.changeCellToForm}
        />
      )
    }
          // updateFormElement = {this.updateFormElement}
          // updateElementText={this.updateElementText}
          // text={this.props.columns[i].text}

    return(
      <tr>
        {columns}
      </tr>
    )
  }
});
