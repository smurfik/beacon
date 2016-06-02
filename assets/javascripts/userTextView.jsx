var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {answer: "Your answer"} // we have to use this component's state
    // in order to display a default value on load, so that it can be
    // dynamically updated as the answer as text is entered, and hold
    // in state until the form is submitted.
  },
  handleInput: function(event) {
    var answer = event.target.value;
    this.setState({answer: answer});
    console.log('triggered in view component', answer);
    this.props.updateAnswer(answer);
    // eventually, put something like 'updateAnswer' here so that the parent
    // component (modal or formBuilder?) gets the users's answer in JSON format
  },
  render: function() {
    return(
      <div className="userText-view">
        <h2>{this.props.formTitle}</h2>
        <form>
          <input
            type="text"
            onChange={this.handleInput}
            value={this.state.answer}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
});
