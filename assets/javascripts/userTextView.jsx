var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {value: "Your answer"}
  },
  handleInput: function(event) {
    this.setState({value: event.target.value});
    // eventually, put something like 'updateAnswer' here so that the parent
    // component (modal or formBuilder?) gets the users's answer in JSON format
  },
  render: function() {
    return(
      <div className="userText-view">
        <form>
          <input
            type="text"
            onChange={this.handleInput}
            value={this.state.value}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
});
