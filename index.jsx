'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Test = React.createClass({
  render: function(){
    return <div>I am a test component!</div>
  }
});

ReactDOM.render(<Test />, document.getElementById('test'));
