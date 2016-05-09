'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var riek = require('riek')
var RIEInput = riek.RIEInput;

var FormBank = {
  Header: React.createClass({
    getInitialState: function() {
      return({text: "Header"});
    },
    changeState: function(newState) {
      this.setState(newState);
    },
    render: function() {
      return(
        <div id="header-form">
          <RIEInput
            value={this.state.text}
            change={this.changeState}
            propName="text"
            className="form-section-header"
            />
        </div>
      )
    }
  }),
  Description: React.createClass({
    getInitialState: function() {
      return({text: "enter description here"});
    },
    changeState: function(newState) {
      this.setState(newState);
    },
    render: function() {
      return(
        <div id="description-form">
          <RIEInput
            value={this.state.text}
            change={this.changeState}
            propName="text"
            className="form-description"
            />
        </div>
      )
    }
  }),
  UserText: React.createClass({
    getInitialState: function() {
      return({text: "answer here"});
    },
    changeState: function(newState) {
      this.setState(newState);
    },
    render: function() {
      return(
        <div id="user-text-form">
          <RIEInput
            value={this.state.text}
            change={this.changeState}
            propName="text"
            className="form-user-text"
            />
        </div>
      )
    }
  }),
  Dropdown: React.createClass({
    getInitialState: function() {
      return({text: "Question"});
    },
    changeState: function(newState) {
      this.setState(newState);
    },
    render: function() {
      return(
        <div id="dropdown-form">
        <RIEInput
          value={this.state.text}
          change={this.changeState}
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
      return {tableRows: [row], columnCount: 1, text: "Table Title"}
    },
    changeState: function(newState) {
      this.setState(newState);
    },
    addRow: function(event) {
      event.preventDefault();
      var newRow = React.createElement(FormBank[event.target.value]);
      var rows = this.state.tableRows;
      rows.push(newRow);
      this.setState({tableRows: rows});
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

      for (var i = 0; i < this.state.tableRows.length; i++) {
        rows.push(<NewRow key={i} element={this.state.tableRows[i]} columnCount={this.state.columnCount}/>);
      }

      for (var i = 0; i < this.state.columnCount; i++) {
        columnHeaders.push(<th key={i}> Column {i+1} </th>);
      }

      return(
        <div id="table-form">
          <RIEInput
            value={this.state.text}
            change={this.changeState}
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
        columns.push(<TableCell key={i} element={this.props.columnCount[i]}/>)
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
    setCellType: function(event) {
      this.setState({active: true, cellType: event.target.value});
    },
    render: function() {
      var body;
      var cellType;
      var dropdown = (
        <div className="form-type-selector">
          <span>Select Form Type:</span>
          <select onChange={this.setCellType}>
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
          React.createElement(FormBank[this.state.cellType])
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
  addElement: function(element) {
    var formElement = React.createElement(FormBank[element]);
    var currentForm = this.state.currentForm;
    currentForm.push(formElement);
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
  render: function(){
    return (
      <div>
        <Builder formElements={this.state.currentForm} deleteElement={this.deleteElement} moveElementUp={this.moveElementUp} moveElementDown={this.moveElementDown}/>
        <Toolbar addElement={this.addElement}/>
      </div>
    );
  }
});

var Builder = React.createClass({
  render: function() {
    var formElements = [];
    var body;

    for (var i = 0; i < this.props.formElements.length; i++) {
      formElements.push(<FormElement key={i} id={i} element={this.props.formElements[i]} deleteElement={this.props.deleteElement} moveElementUp={this.props.moveElementUp} moveElementDown={this.props.moveElementDown}/>)
    }

    if(this.props.formElements[0] == null) {
      body = <span>Add form elements by clicking toolbar ––––></span>
    } else {
      body = (
        <div id="form=element-list">
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
  render: function() {
    return (
      <div className="form-element">
        {this.props.element}
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
