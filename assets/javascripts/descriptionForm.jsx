var React = require('react');
var riek = require('riek')
var RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Description", text: "enter description here"});
  },
  updateElementText: function(newText) {
    this.props.updateElementText(newText.text);
  },
  render: function() {
    return(
      <div id="description-form">
        <RIEInput
          value={this.props.text}
          change={this.updateElementText}
          propName="text"
          className="form-description"
          />
      </div>
    )
  }
});
