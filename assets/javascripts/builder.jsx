var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput,
    FormElement = require('./formElement.jsx');

module.exports = React.createClass({
  render: function() {
    var formElements = [],
        body,
        i;

    for (i = 0; i < this.props.formElements.length; i++) {
      if (this.props.formElements[i].type == "Table") {
        formElements.push(
          <FormElement
            id                    = {i}
            key                   = {i}
            element               = {this.props.formElements[i]}
            formTitle             = {this.props.formElements[i].formTitle}
            tableRows             = {this.props.formElements[i].tableRows}
            addRow                = {this.props.addRow}
            addColumn             = {this.props.addColumn}
            changeCellToForm      = {this.props.changeCellToForm}
            updateFormElement     = {this.props.updateFormElement}
            updateTableFormElement= {this.props.updateTableFormElement}
            moveElementUp         = {this.props.moveElementUp}
            moveElementDown       = {this.props.moveElementDown}
            deleteElement         = {this.props.deleteElement}
            previewAnswers        = {this.props.previewAnswers}
          />
        )
      } else {
        formElements.push(
          <FormElement
            id                = {i}
            key               = {i}
            element           = {this.props.formElements[i]}
            formTitle         = {this.props.formElements[i].formTitle}
            formContent       = {this.props.formElements[i].formContent}
            updateFormElement = {this.props.updateFormElement}
            moveElementUp     = {this.props.moveElementUp}
            moveElementDown   = {this.props.moveElementDown}
            deleteElement     = {this.props.deleteElement}
          />
        )
      }
    }

    if(this.props.formElements[0] == null) {
      body = <span>Add form elements by clicking toolbar ––––></span>
    } else {
      body = (
        <div id="form-element-list">
          {formElements}
        </div>
      )
    }
    return(
      <div id="builder-pane">
        <header>
          <h1>Builder</h1>
          <button id="open-modal-button" onClick={this.props.openModal}>Preview</button>
        </header>
        {body}
      </div>
    );
  }
});
