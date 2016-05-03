'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// the components in the builder will be forms – so they will be different than
// the components we are dropping in from toolbar.

var FormBuilder = React.createClass({
  getInitialState: function() {
    return {currentForm: []}
    // push new formTool into currentForm,
    // use setState to re-render children in Builder
  },
  // setCurrentForm
  render: function(){
    return (
      <div>
        <Builder />
        <Toolbar />
      </div>
    );
  }
});

var Builder = React.createClass({
  render: function() {
    return(
      <div id="preview-pane">
        <h1>Builder</h1>
        <span>I'm the preview pane</span>
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
        <Label />
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
  render: function() {
    return(
      <div className="toolbar-element">
        <h2>Label</h2>
      </div>
    )
  }
})

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
