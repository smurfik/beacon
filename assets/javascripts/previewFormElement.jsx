var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    ViewBank = require('./viewBank.js');

module.exports = React.createClass({
  // updatePreviewFormElement: function() {
      // we'll need a function that passes updates in previewFormElements up to
      // parent, so that user answers can be stored and sent in JSON format.

      // the logic of this function should probably follow that in the standard
      // formElement component -- i.e. look for cell ID to see if the element
      // comes from within a table, or is a standard formElement.
  // },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(
        ViewBank["Table"], {
          formTitle:  this.props.formTitle,
          tableRows: this.props.tableRows,
        }
      );
    } else {
      element = React.createElement(
        ViewBank[this.props.element.type], {
          formTitle:          this.props.formTitle,
          formContent:       this.props.formContent,
          // updatePreviewFormElement: this.updatePreviewFormElement
        }
      )
    }
    return (
      <div className="preview-form-element">
        {element}
      </div>
    )
  }
});
