var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {answer: "Your answer"}
  },
  handleInput: function(event) {
    this.setState({answer: event.target.value});
    // eventually, put something like 'updateAnswer' here so that the parent
    // component (modal or formBuilder?) gets the users's answer in JSON format
  },
  render: function() {
    return(
      <div className="userText-view">
        <h2>{this.props.formName}</h2>
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
