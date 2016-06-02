var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return({answer: "select below"});
  },
  handleChange: function(event) {
    this.state.answer = event.target.value;
    this.forceUpdate();
  },
  render: function() {
    return(
      <div className="dropdown-view">
        <h2>{this.props.formTitle}</h2>
        <select className="dropdown-formContent" onChange={this.handleChange} value={this.state.answer}>
          <option value = "select an answer" > [select] </option>
          <option value = "Option A" > Option A </option>
          <option value = "Option B" > Option B </option>
        </select>
      </div>
    )
  }
});
