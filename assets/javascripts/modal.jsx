var React = require('react'),
    PreviewFormElement = require('./previewFormElement.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {userAnswers: []}
  },
  closeModal: function() {
    this.props.closeModal();
  },
  updateAnswer: function(answer, viewElementId) {
    var userAnswers  = this.state.userAnswers;
    console.log(userAnswers);
    debugger
    console.log("triggered in Modal: ", answer, viewElementId);
    var targetAnswer = userAnswers[viewElementId];
    targetAnswer.answer = answer;
    this.setState({userAnswers: userAnswers});
  },

  // updateTableAnswer: function () {

  // },

  render: function() {
    var previewFormElements = [],
        // userAnswers = [],
        // answerObject = {},
        body,
        bodyContent,
        i;

    // create an array to track answers for each previewFormElement;
    // the array starts empty and is updated as user responds

    // for (i = 0; i < this.props.previewFormElements.length; i++) {
    //   userAnswers.push(answerObject);
    //   // userAnswers.push(
    //   //   answerObject = {
    //   //     id       = {i},
    //   //     question = {this.props.previewFormElements[i].formTitle},
    //   //     answer   = ""
    //   //   }
    //   // )
    // }

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
        )
      } else {
        previewFormElements.push(
          <PreviewFormElement
            id           = {i}
            key          = {i}
            element      = {this.props.previewFormElements[i]}
            formTitle    = {this.props.previewFormElements[i].formTitle}
            formContent  = {this.props.previewFormElements[i].formContent}
            updateAnswer = {this.updateAnswer}
          />
        )
      }
    }
            // updateFormElement={this.props.updateFormElement}

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
