'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var riek = require('riek')
var RIEInput = riek.RIEInput;

var PreviewForm = React.createClass({
  getInitialState: function(){
    return({text: "not yet triggered"});
  },
  changeState: function(event) {
    event.preventDefault();
    var currentState = this.state;
    this.setState({text: event.target.value});
  },
  render: function(){
    return(
      <div>
        <h1>Here's a form.</h1>
        <button onClick={this.changeState} value="Triggered">Click Me</button>
      </div>
    )
  }
});

ReactDOM.render(<PreviewForm />, document.getElementById('preview-form'));
