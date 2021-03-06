var React = require('react');

module.exports = React.createClass({
  handleChange: function(event) {
    var answer = event.target.value;
    this.props.updateAnswer(answer, this.props.questionId);
  },
  render: function() {
    return(
      <div className="dropdown-view">
        <h2>{this.props.formTitle}</h2>
        <select className="dropdown-formContent" onChange={this.handleChange} value={this.props.answer}>
          <option value = "select an answer" > [select] </option>
          <option value = "Option A" > Option A </option>
          <option value = "Option B" > Option B </option>
        </select>
      </div>
    )
  }
});
