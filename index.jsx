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
    render: function() {
      return(
        <div id="table-form">
          <h2>Table</h2>
          <form>
            <table>
              <thead>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
              </thead>
              <tbody>
                <tr>
                  <td>Body Content 1a</td>
                  <td>Body Content 2a</td>
                  <td>Body Content 3a</td>
                  <td>Body Content 4a</td>
                </tr>
                <tr>
                  <td>Body Content 1b</td>
                  <td>Body Content 2b</td>
                  <td>Body Content 3b</td>
                  <td>Body Content 4b</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
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
