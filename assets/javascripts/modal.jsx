var React = require('react'),
    PreviewFormElement = require('./previewFormElement.jsx');

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
          <PreviewFormElement
            id={i}
            text={this.props.previewFormElements[i].text}
            key={i}
            element={this.props.previewFormElements[i]}
            tableRows={this.props.previewFormElements[i].tableRows}
          />
        )
      } else {
        previewFormElements.push(
          <PreviewFormElement
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
        <div id="preview-formElement-list">
          {previewFormElements}
        </div>
      )
    }

    body =  (
      <div id="preview-modal-body">
        <header>
          <h3>Preview Form</h3>
          <button onClick={this.closeModal}>Close preview</button>
        </header>
        {bodyContent}
      </div>
    )

    if (this.props.isOpen) {
      return (
        <div id="modal-container">
          {body}
        </div>
      );
    } else {
      return null;
    }
  }
});