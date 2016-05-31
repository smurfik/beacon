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
            id={i}
            text={this.props.formElements[i].text}
            key={i}
            element={this.props.formElements[i]}
            deleteElement={this.props.deleteElement}
            moveElementUp={this.props.moveElementUp}
            moveElementDown={this.props.moveElementDown}
            updateFormElementText={this.props.updateFormElementText}
            updateTableElementText={this.props.updateTableElementText}
            addRow={this.props.addRow}
            tableRows={this.props.formElements[i].tableRows}
            addColumn={this.props.addColumn}
            changeCellToForm={this.props.changeCellToForm}
          />
        )
      } else {
        formElements.push(
          <FormElement
            id={i}
            text={this.props.formElements[i].text}
            key={i}
            element={this.props.formElements[i]}
            deleteElement={this.props.deleteElement}
            moveElementUp={this.props.moveElementUp}
            moveElementDown={this.props.moveElementDown}
            updateFormElementText={this.props.updateFormElementText}
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
