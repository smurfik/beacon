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
      <div>
        <h1>Preview</h1>
        <span>I'm the preview pane</span>
      </div>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Toolbar</h1>
        <Header />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Header</h1>
      </div>
    )
  }
})

ReactDOM.render(<FormBuilder />, document.getElementById('form-builder'));
