'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var riek = require('riek')
var RIEInput = riek.RIEInput;

var FormBank = {
  Header: React.createClass({
    getInitialState: function() {
      return({type: "Header", text: "Header"});
    },
    updateElementText: function(newText) {
      this.props.updateElementText(newText.text);
    },
    render: function() {
      return(
        <div id="header-form">
          <RIEInput
            value={this.props.text}
            change={this.updateElementText}
            propName="text"
            className="form-section-header"
            />
        </div>
      )
    }
  }),
  Description: React.createClass({
    getInitialState: function() {
      return({type: "Description", text: "enter description here"});
    },
    updateElementText: function(newText) {
      this.props.updateElementText(newText.text);
    },
    render: function() {
      return(
        <div id="description-form">
          <RIEInput
            value={this.props.text}
            change={this.updateElementText}
            propName="text"
            className="form-description"
            />
        </div>
      )
    }
  }),
  UserText: React.createClass({
    getInitialState: function() {
      return({type: "UserText", text: "answer here"});
    },
    updateElementText: function(newText) {
      this.props.updateElementText(newText.text);
    },
    render: function() {
      return(
        <div id="user-text-form">
          <RIEInput
            value={this.props.text}
            change={this.updateElementText}
            propName="text"
            className="form-user-text"
            />
        </div>
      )
    }
  }),
  Dropdown: React.createClass({
    getInitialState: function() {
      return({type: "Dropdown", text: "Question"});
    },
    updateElementText: function(newText) {
      this.props.updateElementText(newText.text);
    },
    render: function() {
      return(
        <div id="dropdown-form">
        <RIEInput
          value={this.props.text}
          change={this.updateElementText}
          propName="text"
          className="form-question-header"
          />
          <select>
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
          </select>
        </div>
      )
    }
  }),
  Table: React.createClass({
    getInitialState: function() {
      var row = React.createElement(FormBank["NewRow"]);
      return {tableRows: [], columnCount: 1, text: "Table Title"}
    },
    updateElementText: function(newText) {
      this.props.updateElementText(newText.text);
    },
    addRow: function(event) {
      event.preventDefault();
      var newRow = React.createElement(FormBank[event.target.value], {addTableElement: "YES"});
      this.props.addRow(newRow);
    },
    addColumn: function(event) {
      event.preventDefault();
      var newColumnCount = this.state.columnCount += 1;
      this.setState({columnCount: newColumnCount});
    },
    render: function() {
      var columnHeaders = [];
      var rows = [];
      var NewRow = FormBank["NewRow"];

      for (var i = 0; i < this.props.tableRows.length; i++) {
        rows.push(<NewRow key={i} element={this.props.tableRows[i]} columnCount={this.state.columnCount} updateElementText={this.updateElementText} addTableElement={this.props.addTableElement}/>);
      }

      for (var i = 0; i < this.state.columnCount; i++) {
        columnHeaders.push(<th key={i}> Column {i+1} </th>);
      }

      return(
        <div id="table-form">
          <RIEInput
            value={this.props.text}
            change={this.updateElementText}
            propName="text"
            className="form-question-header"
          />
          <button id="add-column-button" onClick={this.addColumn}>Add Column</button>
          <form>
            <table>
              <thead>
                <tr>
                  {columnHeaders}
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </form>
          <button onClick={this.addRow} value="NewRow">Add Row</button>
        </div>
      )
    }
  }),
  NewRow: React.createClass({
    getInitialState: function() {
      return {columnCount: this.props.columnCount}
    },

    render: function() {
      var columns = [];
      var TableCell = FormBank["TableCell"];

      for (var i = 0; i < this.props.columnCount; i++) {
        columns.push(<TableCell key={i} element={this.props.columnCount[i]} updateElementText={this.props.updateElementText} addTableElement={this.props.addTableElement}/>)
      }

      return(
        <tr>
          {columns}
        </tr>
      )
    }
  }),
  TableCell: React.createClass({
    getInitialState: function() {
      return({active: false, cellType: ""});
    },
    // setCellType: function(event) {
    //   // var type = event.target.value;
    //   // this.setState({active: true, cellType: "UserText"});
    //   this.setState({active: true, cellType: event.target.value});
    // },
    addTableElement: function(event) {
      this.props.addTableElement(event.target.value);
    },

    updateElementText: function(newText) {
      this.props.updateElementText(newText.text);
    },

    render: function() {
      var body;
      var cellType;
      var dropdown = (
        <div className="form-type-selector">
          <span>Select Form Type:</span>
          <select onChange={this.addTableElement}>
            <option value="selected">[select]</option>
            <option value="UserText">Text</option>
            <option value="Dropdown">Dropdown</option>
          </select>
        </div>
      )

      if (this.state.active == false) {
        body = (
          <div>
            {dropdown}
          </div>
        )
      } else {
        cellType = (
          React.createElement(FormBank[this.state.cellType], {text: "text", updateElementText: this.updateElementText})
          // React.createElement(FormBank[this.state.cellType], {text: this.props.text})
          // React.createElement(FormBank[this.state.cellType], {text: this.props.text, updateElementText: this.updateElementText})
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
  }),
  selected: function() {
    return <div></div>
  }
}

var FormBuilder = React.createClass({
  getInitialState: function() {
    return {currentForm: []}
  },
  addElement: function(elementType) {
    var formElementObject = {};
    var addRow = function() {
      // this is where addRow is passed along as a function to Table FormElement. Don't delete.
    };
    if (elementType == "Table") {
      formElementObject = {type: elementType, text: elementType, tableRows: [], addRow: addRow}
    } else {
      formElementObject = {type: elementType, text: elementType};
    }
    var currentForm = this.state.currentForm;
    currentForm.push(formElementObject);
    this.setState({currentForm: currentForm});
  },
  addTableElement: function(elementType) {
    console.log("addTableElement triggered in FormBuilder");
  },
  addRow: function(newRow, id) {
    var currentForm = this.state.currentForm;
    currentForm[id].tableRows.push(newRow);
    this.setState({currentForm: currentForm});
  },
  updateElementText: function(newText, id) {
    var currentForm = this.state.currentForm;
    currentForm[id].text = newText
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
        <Builder formElements={this.state.currentForm} deleteElement={this.deleteElement} moveElementUp={this.moveElementUp} moveElementDown={this.moveElementDown} updateElementText={this.updateElementText} addTableElement={this.addTableElement} addRow={this.addRow}/>
        <Toolbar addElement={this.addElement}/>
      </div>
    );
  }
});

var Builder = React.createClass({
  addTableElement: function(elementType) {
    console.log("addTableElement triggered in Builder");
    console.log(elementType);
  },
  render: function() {
    var formElements = [];
    var body;

    for (var i = 0; i < this.props.formElements.length; i++) {
      if (this.props.formElements[i].type == "Table") {
        formElements.push(<FormElement id={i} text={this.props.formElements[i].text} key={i} element={this.props.formElements[i]} deleteElement={this.props.deleteElement} moveElementUp={this.props.moveElementUp} moveElementDown={this.props.moveElementDown} updateElementText={this.props.updateElementText} addTableElement={this.addTableElement} addRow={this.props.addRow} tableRows={this.props.formElements[i].tableRows}/>)
      } else {
        formElements.push(<FormElement id={i} text={this.props.formElements[i].text} key={i} element={this.props.formElements[i]} deleteElement={this.props.deleteElement} moveElementUp={this.props.moveElementUp} moveElementDown={this.props.moveElementDown} updateElementText={this.props.updateElementText}/>)
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
      <div id="preview-pane">
        <h1>Builder</h1>
        {body}
      </div>
    );
  }
});

var FormElement = React.createClass({
  updateElementText: function(newText, id) {
    var id = this.props.id
    this.props.updateElementText(newText, id);
  },
  deleteElement: function(event, id) {
    event.preventDefault();
    var id = this.props.id;
    this.props.deleteElement(id);
  },
  moveElementUp: function(event, id) {
    event.preventDefault();
    var id = this.props.id;
    this.props.moveElementUp(id);
  },
  moveElementDown: function(event, id) {
    event.preventDefault();
    var id = this.props.id;
    this.props.moveElementDown(id);
  },
  addRow: function(newRow, id) {
    var id = this.props.id
    this.props.addRow(newRow, id);
  },
  render: function() {
    var element;
    if (this.props.element.type == "Table") {
      element = React.createElement(FormBank[this.props.element.type], {text: this.props.text, updateElementText: this.updateElementText, addRow: this.addRow, tableRows: this.props.tableRows})
    } else {
      element = React.createElement(FormBank[this.props.element.type], {text: this.props.text, updateElementText: this.updateElementText});
    }
    return (
      <div className="form-element">
        {element}
        <button onClick={this.deleteElement}>Delete</button>
        <button onClick={this.moveElementUp}>Move Up</button>
        <button onClick={this.moveElementDown}>Move Down</button>
      </div>
    )
  }
});

var Toolbar = React.createClass({
  addElement: function(event) {
    this.props.addElement(event.target.value);
  },
  render: function() {
    return(
      <div id="toolbar-pane">
        <h1>Toolbar</h1>
        <span className="toolbar-section-header">Form Layout & Construction</span>
        <h2 className="toolbar-element" onClick={this.addElement} value="Header">Header</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="Description">Description</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="Table">Table</h2>
        <span className="toolbar-section-header">Question Types</span>
        <h2 className="toolbar-element" onClick={this.addElement} value="Dropdown">Dropdown</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="UserText">Text</h2>
      </div>
    );
  }
});

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
