var React = require('react');

module.exports = React.createClass({
  addElement: function(event) {
    this.props.addElement(event.target.value);
  },
  render: function() {
    return(
      <div id="toolbar-pane">
        <h1>Toolbar</h1>
        <span className="toolbar-section-header">Form Layout & Construction</span>
        <h2 className="toolbar-element" onClick={this.addElement} value="Header">Header</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="Description">Description</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="Table">Table</h2>
        <span className="toolbar-section-header">Question Types</span>
        <h2 className="toolbar-element" onClick={this.addElement} value="Dropdown">Dropdown</h2>
        <h2 className="toolbar-element" onClick={this.addElement} value="UserText">Text</h2>
      </div>
    );
  }
});
