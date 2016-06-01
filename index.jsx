'use strict';

var React       = require('react'),
    ReactDOM    = require('react-dom'),
    riek        = require('riek'),
    RIEInput    = riek.RIEInput,
    Builder     = require('./assets/javascripts/builder.jsx'),
    FormElement = require('./assets/javascripts/formElement.jsx'),
    Toolbar     = require('./assets/javascripts/toolbar.jsx'),
    FormBank    = require('./assets/javascripts/formBank.js'),
    Modal       = require('./assets/javascripts/modal.jsx');

var FormBuilder = React.createClass({
  getInitialState: function() {
    return {currentForm: [], isModalOpen: false}
  },
  openModal: function() {
    this.setState({isModalOpen: true});
  },
  closeModal: function() {
    this.setState({isModalOpen: false});
  },
  addElement: function(elementType) {
    var formElementObject = {};
    var addRow = function() {
      // DON'T DELETE: this is where addRow is defined as one of Table FormElement's props (as a function) when it is added to Builder.
    };
    var addColumn = function() {
      // don't delete per same reasons as above, but for columns.
    };
    if (elementType == "Header" || elementType == "Description") { // any additional form elements that do not require an editable 'formName' field should go here
      formElementObject = {type: elementType, formContent: elementType};
    } else if (elementType == "Table") {
      formElementObject = {type: elementType, formName: "Table Title", tableRows: [{columns: [{type: "unselected", formContent: "[Enter question]"}]}], addRow: addRow, addColumn: addColumn}
    } else {
      formElementObject = {type: elementType, formName: "Question", formContent: "response"};
    }
    var currentForm = this.state.currentForm;
    currentForm.push(formElementObject);
    this.setState({currentForm: currentForm});
  },
  addRow: function(newRowObject, id) {
    var currentForm = this.state.currentForm;
    currentForm[id].tableRows.push(newRowObject);
    this.setState({currentForm: currentForm});
  },
  addColumn: function(id) {
    var currentForm = this.state.currentForm;
    var tableRows = currentForm[id].tableRows;
    for (var i = 0; i < tableRows.length; i++) {
      var newCellObject = {type: "unselected", formContent: "[Enter question]"};
      tableRows[i].columns.push(newCellObject);
    }
    this.setState({currentForm: currentForm});
  },
  changeCellToForm: function(cellType, cellId, rowId, tableId) {
    var currentForm = this.state.currentForm;
    var targetCell = currentForm[tableId].tableRows[rowId].columns[cellId];
    targetCell.type = cellType;
    this.setState({currentForm: currentForm});
  },
  updateFormElement: function(newText, formElementId, sectionToUpdate) {
    var currentForm = this.state.currentForm;
    var targetCell  = currentForm[formElementId];
    if (sectionToUpdate == "formName") {
      targetCell.formName = newText
    } else if (sectionToUpdate == "formContent") {
      targetCell.formContent = newText;
    }
    this.setState({currentForm: currentForm});
  },

  // add functions for:
  //  updateTableFormName
  //  updateTableFormContent

  updateTableElementText: function(newText, cellId, rowId, tableId) {
    var currentForm = this.state.currentForm;
    var targetCell = currentForm[tableId].tableRows[rowId].columns[cellId];
    targetCell.text = newText;
    this.setState({currentForm: currentForm});
  },

  deleteElement: function(id) {
    var currentForm = this.state.currentForm;
    currentForm.splice(id, 1);
    this.setState({currentForm: currentForm});
  },
  moveElementUp: function(id) {
    var currentForm = this.state.currentForm;
    var movedUp = currentForm[id];
    var movedDown = currentForm[(id - 1)];
    currentForm[(id - 1)] = movedUp;
    currentForm[id] = movedDown;
    this.setState({currentForm: currentForm});
  },
  moveElementDown: function(id) {
    var currentForm = this.state.currentForm;
    var movedDown = currentForm[id];
    var movedUp = currentForm[(id + 1)];
    currentForm[(id + 1)] = movedDown;
    currentForm[(id)] = movedUp;
    this.setState({currentForm: currentForm});
  },
  render: function(){
    return (
      <div>
        <Modal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          previewFormElements={this.state.currentForm}
          updateFormElement={this.updateFormElement}>
        </Modal>
        <Builder
          formElements={this.state.currentForm}
          deleteElement={this.deleteElement}
          moveElementUp={this.moveElementUp}
          moveElementDown={this.moveElementDown}
          updateFormElement={this.updateFormElement}

          updateFormName={this.updateFormName}
          updateFormContent={this.updateFormContent}

          updateFormElementText={this.updateFormElementText}
          updateTableElementText={this.updateTableElementText}

          addRow={this.addRow} addColumn={this.addColumn}
          changeCellToForm={this.changeCellToForm}
          openModal={this.openModal}
        />
        <Toolbar addElement={this.addElement}/>
      </div>
    );
  }
});

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
