var React = require('react');
var riek = require('riek')
var RIEInput = riek.RIEInput;
var FormBank = require('./formBank.js');

module.exports = React.createClass({
  changeCellToForm: function(event) {
    var cellId = this.props.id // == this cell's id, passed up so that the right cell can be rerendered as a form.
    var cellType = event.target.value
    this.props.changeCellToForm(cellType, cellId);
  },
  updateElementText: function(newText) {
    var cellId = this.props.id // == this cell's id, passed up so that the right cell's contents can be updated.
    this.props.updateElementText(newText, cellId);
  },
  render: function() {
    var body;
    var cellType;
    var dropdown = (
      <div className="form-type-selector">
        <span>Select Form Type:</span>
        <select onChange={this.changeCellToForm}>
          <option value="selected">[select]</option>
          <option value="UserText">Text</option>
          <option value="Dropdown">Dropdown</option>
        </select>
      </div>
    )

    if (this.props.type == "unselected") {
      body = (
        <div>
          {dropdown}
        </div>
      )
    } else {
      var type = this.props.type;
      var text = this.props.text;
      cellType = (
        React.createElement(FormBank[type], {text: text, updateElementText: this.updateElementText})
      )
      body = (
        <div>
          {cellType}
          {dropdown}
        </div>
      )
    }

    return (
      <td>
        {body}
      </td>
    )
  }
});
