var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "UserText", text: "answer here"});
  },
  updateElementText: function(newText) {
    this.props.updateElementText(newText.text);
  },
  render: function() {
    return(
      <div id="user-text-form">
        <RIEInput
          value={this.props.text}
          change={this.updateElementText}
          propName="text"
          className="form-user-text"
          />
      </div>
    )
  }
});
