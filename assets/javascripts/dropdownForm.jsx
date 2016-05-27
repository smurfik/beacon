var React = require('react'),
    riek = require('riek'),
    RIEInput = riek.RIEInput;

module.exports = React.createClass({
  getInitialState: function() {
    return({type: "Dropdown", text: "Question"});
  },
  updateElementText: function(newText) {
    this.props.updateElementText(newText.text);
  },
  render: function() {
    return(
      <div id="dropdown-form">
      <RIEInput
        value={this.props.text}
        change={this.updateElementText}
        propName="text"
        className="form-question-header"
        />
        <select>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
        </select>
      </div>
    )
  }
});
