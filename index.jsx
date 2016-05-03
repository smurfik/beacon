'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var FormBuilder = React.createClass({
  render: function(){
    return (
      <div>
        <Preview />
        <Toolbar />
      </div>
    );
  }
});

var Preview = React.createClass({
  render: function() {
    return(
      <div id="preview-pane">
        <h1>Preview</h1>
        <span>I'm the preview pane</span>
      </div>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {
    return(
      <div id="toolbar-pane">
        <h1>Toolbar</h1>
        <Header />
        <Label />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return(
      <div>
        <h2>Header</h2>
      </div>
    )
  }
})

var Label = React.createClass({
  render: function() {
    return(
      <div class="form-element">
        <h2>Label</h2>
      </div>
    )
  }
})

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
