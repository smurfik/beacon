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
    return {currentForm: [], previewAnswers: [], isModalOpen: false}
  },
  openModal: function() {
    this.setState({isModalOpen: true});
  },
  closeModal: function() {
    this.setState({isModalOpen: false});
  },
  addElement: function(elementType) {
    var formElementObject = {};
    var previewAnswerObject = {}
    var addRow = function() {
      // DON'T DELETE: this is where addRow is defined as one of Table FormElement's props (as a function) when it is added to Builder.
    };
    var addColumn = function() {
      // don't delete per same reasons as above, but for columns.
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
            }],
          }]
      }
    } else {
      formElementObject = {
        type: elementType,
        formTitle: "Question",
        formContent: "Your answer"
      };
      previewAnswerObject = {
        answer: "Your answer"
      }
    }
    var currentForm = this.state.currentForm;
    currentForm.push(formElementObject);
    var previewAnswers = this.state.previewAnswers
    previewAnswers.push(previewAnswerObject);
    this.setState({currentForm: currentForm, previewAnswers: previewAnswers});
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
      var newCellObject = {
        type: "unselected",
        formTitle:         "Question",
        formContent:       "[Enter question]",
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
  updatePreviewAnswer: function(answer, viewElementId) {
    var previewAnswers = this.state.previewAnswers;
    // HERE
    // debugger
    // var targetAnswer = previewAnswers[viewElementId];
    // targetAnswer.answer = answer;
    // this.setState({previewAnswers: previewAnswers})
  },
  render: function(){
    return (
      <div>
        <Modal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          previewFormElements={this.state.currentForm}
          previewAnswers={this.state.previewAnswers}
          updateFormElement={this.updateFormElement}>
        </Modal>
        <Builder
          formElements={this.state.currentForm}
          deleteElement={this.deleteElement}
          moveElementUp={this.moveElementUp}
          moveElementDown={this.moveElementDown}
          updateFormElement={this.updateFormElement}
          updateTableFormElement={this.updateTableFormElement}
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
