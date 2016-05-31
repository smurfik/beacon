var React = require('react'),
    previewFormElement = require('./previewFormElement.jsx');

module.exports = React.createClass({
  closeModal: function() {
    this.props.closeModal();
  },

  render: function() {
    var previewFormElements = [],
        body,
        bodyContent,
        i;

    for (i = 0; i < this.props.previewFormElements.length; i++) {
      if (this.props.previewFormElements[i].type == "Table") {
        previewFormElements.push(
          <previewFormElement
            id={i}
            text={this.props.previewFormElements[i].text}
            key={i}
            element={this.props.previewFormElements[i]}
            tableRows={this.props.previewFormElements[i].tableRows}
          />
        )
      } else {
        previewFormElements.push(
          <previewFormElement
            id={i}
            text={this.props.previewFormElements[i].text}
            key={i}
            element={this.props.previewFormElements[i]}
            updateElementText={this.props.updateElementText}
          />
        )
      }
    }

    if (this.props.previewFormElements[0] == null) {
      bodyContent = <span>Nothing to preview</span>
    } else {
      bodyContent = (
        <div id="preview-form-element-list">
          {previewFormElements}
        </div>
      )
    }

    body =  (
      <div className="modal">
        <div id="preview-form-modal">
          <header>
            <h3>Preview Form</h3>
            <button onClick={this.closeModal}>Close preview</button>
          </header>
          {bodyContent}
        </div>
      </div>
    )

    if (this.props.isOpen) {
      return (
        <div>
          {body}
        </div>
      );
    } else {
      return null;
    }
  }
});
