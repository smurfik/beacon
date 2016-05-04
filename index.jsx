'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// The components added to the builder will be forms – so they will be different
// than the components we are selecting from the toolbar.

// But for now, let's just add text placeholders in the builder, and turn them
// into forms later.

var FormBuilder = React.createClass({
  getInitialState: function() {
    // currentForm starts as an empty array when page is loaded
    return {currentForm: []}
  },
  addTool: function(toolName) {
    var currentForm = this.state.currentForm;
    // clicking an element on the toolbar pushes that element into currentForm
    currentForm.push(toolName);
    // setState re-renders children in Builder
    this.setState({currentForm: currentForm})
  },
  render: function(){
    return (
      <div>
        <Builder formElements={this.state.currentForm} />
        <Toolbar addTool={this.addTool}/>
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
        <span>{this.props.element}</span>
      </div>
    )
  }
});

var Toolbar = React.createClass({
  render: function() {
    // all elements in toolbar will share same handleClick function to add to builder
      // (later, use inheritance/mixin/module pattern to make the code DRYer)
    return(
      <div id="toolbar-pane">
        <h1>Toolbar</h1>
        <Header addTool={this.props.addTool}/>
        <Label handleClick={this.props.addTool}/>
      </div>
    );
    // need to hard-code other toolbar elements within toolbar-pane div above,
    // and create each of them as a unique React class below.
  }
});

var Header = React.createClass({
  getInitialState: function() {
    return {toolName: "header"};
  },
  addTool: function() {
    this.props.addTool(this.state.toolName);
  },
  render: function() {
    return(
      <div className="toolbar-element" onClick={this.addTool}>
        <h2>Header</h2>
      </div>
    )
  }
})

var Label = React.createClass({
  // For now, we are just passing the name of the tool element from the toolbar
  // up to the parent and then back down to builder.

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
  // Looking ahead, we probably won't be passing the actual form element object [or its name] around.
  // Instead, maybe we'll pass a *reference* to an element up to the
  // parent, which will then render a *different* component containing an HTML form.
  // The match could happen on a unique keyword that is shared between toolbar
  // element and builder form element.
})

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
