var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Header", text: "Header"});
  },
  updateElementText: function(newText) {
    this.props.updateElementText(newText.text);
  },
  render: function() {
    return(
      <div id="header-form">
        <RIEInput
          value={this.props.text}
          change={this.updateElementText}
          propName="text"
          className="form-section-header"
          />
      </div>
    )
  }
});
