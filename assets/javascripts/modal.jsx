var React = require('react'),
    PreviewFormElement = require('./previewFormElement.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {previewAnswers: this.props.previewAnswers}
  },
  closeModal: function() {
    this.props.closeModal();
  },
  updateAnswer: function(answer, questionId) {
    var previewAnswers           = this.state.previewAnswers;
    previewAnswers[questionId]   = answer;
    this.setState({previewAnswers: previewAnswers});
  },
  showAnswers: function() {
    // collect answers of all PreviewFormElements and display as JSON in console.
    // Eventually this should return JSON in a new route/view, for AJAX.
    console.log(this.state.previewAnswers);
  },
  render: function() {
    var previewFormElements = [],
        body,
        bodyContent,
        i;

    for (i = 0; i < this.props.previewFormElements.length; i++) {
      var pfeType = this.props.previewFormElements[i].type;
      if (pfeType == "Header" || pfeType == "Description") {
        previewFormElements.push(
          <PreviewFormElement
            key          = {i}
            element      = {this.props.previewFormElements[i]}
            formTitle    = {this.props.previewFormElements[i].formTitle}
            formContent  = {this.props.previewFormElements[i].formContent}
          />
        )
      } else if (pfeType == "Table") {
        previewFormElements.push(
          <PreviewFormElement
            key            = {i}
            id             = {i}
            element        = {this.props.previewFormElements[i]}
            questionId     = {this.props.previewFormElements[i].questionId}
            formTitle      = {this.props.previewFormElements[i].formTitle}
            tableRows      = {this.props.previewFormElements[i].tableRows}
            updateAnswer   = {this.updateAnswer}
            previewAnswers = {this.state.previewAnswers}
          />
        );
      } else {
        var questionId = this.props.previewFormElements[i].questionId;
        previewFormElements.push(
          <PreviewFormElement
            key          = {questionId}
            element      = {this.props.previewFormElements[i]}
            questionId   = {questionId}
            formTitle    = {this.props.previewFormElements[i].formTitle}
            formContent  = {this.props.previewFormElements[i].formContent}
            answer       = {this.state.previewAnswers[questionId]}
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
        <button onClick={this.showAnswers}>Submit Form</button>
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
