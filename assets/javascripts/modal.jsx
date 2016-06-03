var React = require('react'),
    PreviewFormElement = require('./previewFormElement.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {previewAnswers: this.props.previewAnswers}
  },
  closeModal: function() {
    this.props.closeModal();
  },
  updateAnswer: function(answer, viewElementId) {
    var previewAnswers  = this.state.previewAnswers,
        targetAnswer = previewAnswers[viewElementId];
    targetAnswer.answer = answer;
    this.setState({previewAnswers: previewAnswers});
  },
  // updateTableAnswer: function () {

  // },
  showAnswers: function() {
    // collect answers of all PreviewFormElements (iterate through them)
    // and display as JSON in console,
    // eventually returning as JSON in a new route/view for AJAX
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
            id        = {i}
            key       = {i}
            element   = {this.props.previewFormElements[i]}
            formTitle = {this.props.previewFormElements[i].formTitle}
            tableRows = {this.props.previewFormElements[i].tableRows}
          />
        );
      } else {
        previewFormElements.push(
          <PreviewFormElement
            id           = {i}
            key          = {i}
            element      = {this.props.previewFormElements[i]}
            formTitle    = {this.props.previewFormElements[i].formTitle}
            formContent  = {this.props.previewFormElements[i].formContent}
            answer       = {this.props.previewAnswers[i].answer}
            updateAnswer = {this.updateAnswer}
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
        <button onClick={this.showAnswers}>Submit</button>
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
