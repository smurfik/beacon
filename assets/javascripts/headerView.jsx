var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div className="header-view">
        <h1>{this.props.formTitle}</h1>
      </div>
    )
  }
});
