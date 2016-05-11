var React = require('react');
var riek = require('riek')
var RIEInput = riek.RIEInput;

module.exports = React.createClass({
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
})
