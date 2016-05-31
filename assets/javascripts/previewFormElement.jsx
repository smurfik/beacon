var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    FormBank = require('./formBank.js');

module.exports = React.createClass({
  updateElementText: function(newText, cellId, rowId) {
    var tableId = this.props.id;
    if (cellId == undefined) { //i.e. if we are updating the text of a standard form element in builder, not a tableCell, which is form within a Table
      this.props.updateFormElementText(newText, tableId);
    } else {
      this.props.updateTableElementText(newText, cellId, rowId, tableId);
    }
  },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(
        FormBank["Table"], {
          text: this.props.text,
          tableRows: this.props.tableRows,
        }
      );
    } else {
      element = React.createElement(
        FormBank[this.props.element.type], {
          text: this.props.text,
          updateElementText: this.updateElementText
        }
      );
    }
    return (
      <div className="preview-form-element">
        {element}
      </div>
    )
  }
});
