var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div className="description-view">
        <h2>{this.props.formTitle}</h2>
      </div>
    )
  }
});
