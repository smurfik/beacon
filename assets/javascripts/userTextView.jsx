var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {formValue: "Your Answer"}
  },
  handleInput: function(event) {
    var answer = event.target.value;
    this.props.updateAnswer(answer, this.props.questionId);
  },
  render: function() {
    return(
      <div className="userText-view">
        <h2>{this.props.formTitle}</h2>
        <form>
          <input
            type    = "text"
            onChange= {this.handleInput}
            value   = {this.props.answer}/>
        </form>
      </div>
    )
  }
});
