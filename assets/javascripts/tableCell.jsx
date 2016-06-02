var React       = require('react'),
    riek        = require('riek'),
    RIEInput    = riek.RIEInput,
    Header      = require('./headerForm.jsx'),
    Description = require('./descriptionForm.jsx'),
    UserText    = require('./userTextForm.jsx'),
    Dropdown    = require('./dropdownForm.jsx'),
    localFormBank = {
      Header: Header,
      Description: Description,
      UserText: UserText,
      Dropdown: Dropdown,
    },
    sectionToUpdate;

module.exports = React.createClass({
  changeCellToForm: function(event) {
    var cellId   = this.props.id // == this cell's id, passed up so that the right cell can be rerendered as a form.
    var cellType = event.target.value
    this.props.changeCellToForm(cellType, cellId);
  },
  updateFormElement: function(newText) {
    var cellId = this.props.id // == this cell's id, passed up so that the right cell's contents can be updated.
    // console.log(sectionToUpdate)
    // debugger
    // this.props.updateFormElement(newText, sectionToUpdate, cellId);
    console.log("UFE triggered in tableCell", newText, cellId);
    this.props.updateFormElement(newText, cellId);
  },

  // updateFormName: function(newText) {
  //   sectionToUpdate = "formName";
  //   console.log("updateFormName triggered in TABLECELL module: *", newText.formName, "*", sectionToUpdate, this.props.id);
  //   // this.props.updateFormElement(newText.formName, sectionToUpdate, cellId);
  // },
  // updateFormContent: function(newText) {
  //   sectionToUpdate = "formContent";
  //   // this.props.updateFormElement(newText.formContent, sectionToUpdate)
  //   console.log("updateFormContent triggered in TABLECELL module: *", newText.formContent, "*", sectionToUpdate);
  // },

  // updateElementText: function(newText) {
  //   var cellId = this.props.id // == this cell's id, passed up so that the right cell's contents can be updated.
  //   this.props.updateElementText(newText, cellId);
  // },
  render: function() {
    var body;
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
      var cellBody = (
        React.createElement(
          localFormBank[this.props.type], {
            // formName:        "Question",
            // formName:        this.props.type,

            cellId:            this.props.id,
            formName:          this.props.formName,
            formContent:       this.props.formContent,
            updateFormElement: this.updateFormElement

            // updateFormName:    this.updateFormName,
            // updateFormContent: this.updateFormContent

            // SOMETHING NEEDS TO BE HERE AS A PROP FOR THE CELL TO RERENDER AS A FORM:
            // updateFormElement: this.props.updateFormElement
            // BECAUSE REACT NEEDS TO SEE THE COMPONENT HAS THE PROP THAT IT GETS FROM ITS PARENT WHEN IT IS RENDERED AS A CHILD

            // BUT WE NEED TO MAKE THE PROPS COMING FROM THE PARENT BE UPDATEFORM*NAME* AND *CONTENT* INSTEAD

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
