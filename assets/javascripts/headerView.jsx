var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div className="header-view">
        <h1>{this.props.formContent}</h1>
      </div>
    )
  }
});
