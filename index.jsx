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
    var updateFormTitle = function() {
      // don't delete per same reasons as above, but for rows and table cells.
    };
    var updateFormContent = function() {
      // don't delete per same reasons as above, but for rows and table cells.
    };
    if (elementType == "Header" || elementType == "Description") { // any additional form elements that do not require an editable 'formContent' field should go here
      formElementObject = {
        type:      elementType,
        formTitle: elementType
      };
    } else if (elementType == "Table") {
      formElementObject = {
        type:       elementType,
        formTitle:  "Table Title",
        addRow:     addRow,
        addColumn:  addColumn,
        tableRows:
          [{columns:
            [{
              // cellId:          null,
              type:              "unselected",
              formTitle:         "Question",
              formContent:       "[Enter question]",
              updateFormTitle:   updateFormTitle,
              updateFormContent: updateFormContent
            }],
            updateFormTitle:   updateFormTitle,
            updateFormContent: updateFormContent
          }]
      }
    } else {

      formElementObject = {
        type: elementType,
        formTitle: "Question",
        formContent: "Your answer"
      };
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
    var updateFormTitle = function() {
      // don't delete per same reasons as above, but for rows and table cells.
    };
    var updateFormContent = function() {
      // don't delete per same reasons as above, but for rows and table cells.
    };

    var currentForm = this.state.currentForm;
    var tableRows = currentForm[id].tableRows;
    for (var i = 0; i < tableRows.length; i++) {
      var newCellObject = {
        type: "unselected",
        formTitle:         "Question",
        formContent:       "[Enter question]",
        updateFormTitle:   updateFormTitle,
        updateFormContent: updateFormContent
      };
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
  updateFormElement: function(newText, formElementId) {
    var currentForm = this.state.currentForm;
    var targetCell  = currentForm[formElementId];
    targetCell.formTitle = newText
    this.setState({currentForm: currentForm});
  },
  updateTableFormElement: function(newText, cellId, rowId, formElementId) {
    var currentForm = this.state.currentForm;
    var targetCell = currentForm[formElementId].tableRows[rowId].columns[cellId];
    targetCell.formTitle = newText;
    this.setState({currentForm: currentForm})
  },

  // add functions for:
  //  updateTable
  //  updateTableFormContent

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
          updateTableFormElement={this.updateTableFormElement}

          updateFormTitle={this.updateFormTitle}
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
