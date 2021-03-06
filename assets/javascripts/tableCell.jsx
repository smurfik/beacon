var React         = require('react'),
    riek          = require('riek'),
    RIEInput      = riek.RIEInput,
    Header        = require('./headerForm.jsx'),
    Description   = require('./descriptionForm.jsx'),
    UserText      = require('./userTextForm.jsx'),
    Dropdown      = require('./dropdownForm.jsx'),
    localFormBank = {
      Header: Header,
      Description: Description,
      UserText: UserText,
      Dropdown: Dropdown,
    };

module.exports = React.createClass({
  changeCellToForm: function(event) {
    var cellId   = this.props.id; // == this cell's id, passed up so that the right cell can be rerendered as a form.
        cellType = event.target.value
    this.props.changeCellToForm(cellType, cellId);
  },
  updateFormElement: function(newText) {
    var cellId = this.props.id // == this cell's id, passed up so that the right cell's contents can be updated.
    this.props.updateFormElement(newText, cellId);
  },
  render: function() {
    var body,
        dropdown = (
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
      var cellBody = (
        React.createElement(
          localFormBank[this.props.type], {
            cellId:            this.props.id,
            formTitle:         this.props.formTitle,
            formContent:       this.props.formContent,
            updateFormElement: this.updateFormElement
          }
        )
      )
      body = (
        <div>
          {cellBody}
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
