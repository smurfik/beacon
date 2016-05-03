'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// the components in the builder will be forms – so they will be different than
// the components we are dropping in from toolbar.

var FormBuilder = React.createClass({
  // var currentForm;
  getInitialState: function() {
    return {currentForm: []}
    // push new formTool into currentForm,
    // use setState to re-render children in Builder
  },
  addTool: function(toolName) {
    var currentForm = this.state.currentForm;
    currentForm.push(toolName);
    this.setState({currentForm: currentForm})
  },
  render: function(){
    return (
      <div>
        <Builder />
        <Toolbar addTool={this.addTool}/>
      </div>
    );
  }
});

var Builder = React.createClass({
  render: function() {
    return(
      <div id="preview-pane">
        <h1>Builder</h1>
        <span>List of [editable] form elements:</span>
      </div>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {
    // all tools will share same handleClick function to add to builder
      // function will be passed down from parent
      // (later, use inheritance/mixin/module pattern)
    return(
      <div id="toolbar-pane">
        <h1>Toolbar</h1>
        <Header />
        <Label handleClick={this.props.addTool}/>
      </div>
    );
    // hard-code other toolbar elements in toolbar-pane above,
    // and create each of them as React classes below.
  }
});

var Header = React.createClass({
  render: function() {
    return(
      <div className="toolbar-element">
        <h2>Header</h2>
      </div>
    )
  }
})

var Label = React.createClass({
  getInitialState: function() {
    return {toolName: "label"};
  },
  addTool: function() {
    this.props.handleClick(this.state.toolName);
  },
  render: function() {
    return(
      <div className="toolbar-element" onClick={this.addTool}>
        <h2>Label</h2>
      </div>
    )
  }
})

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
