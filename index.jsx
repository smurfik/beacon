'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var FormBank = {
  Header: React.createClass({
    render: function() {
      return(
        <div id="header-form">
          <h2>Header</h2>
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
    }
  }),
  Label: React.createClass({
    render: function() {
      return(
        <div id="label-form">
          <h2>Label</h2>
          <form>
            <textarea></textarea>
          </form>
        </div>
      )
    }
  }),
  Dropdown: React.createClass({
    render: function() {
      return(
        <div id="dropdown-form">
          <h2>Dropdown</h2>
          <form>
            <select>
              <option value="value1">Value 1</option>
              <option value="value2">Value 2</option>
            </select>
          </form>
        </div>
      )
    }
  }),
  Table: React.createClass({
    getInitialState: function() {
      var row = React.createElement(FormBank["NewRow"]);
      return {tableRows: [row], columnCount: 1}
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
      var rows = [];
      var NewRow = FormBank["NewRow"];

      for (var i = 0; i < this.state.tableRows.length; i++) {
        rows.push(<NewRow key={i} element={this.state.tableRows[i]} columnCount={this.state.columnCount}/>)
      }

      return(
        <div id="table-form">
          <h2>Table</h2>
          <button id="add-column-button" onClick={this.addColumn}>Add Column</button>
          <form>
            <table>
              <thead>
                <tr>
                  <th>Column 1</th>
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
    render: function() {
      return(
        <td>
          I'm a cell!
        </td>
      )
    }
  })
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
  render: function(){
    return (
      <div>
        <Builder formElements={this.state.currentForm} />
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
      formElements.push(<FormElement key={i} element={this.props.formElements[i]}/>)
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
  render: function() {
    return (
      <div className="form-element">
        {this.props.element}
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
        <h2 className="toolbar-element" onClick={this.addElement} value="Header">Header</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="Label">Label</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="Dropdown">Dropdown</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="Table">Table</h2>
      </div>
    );
  }
});

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
