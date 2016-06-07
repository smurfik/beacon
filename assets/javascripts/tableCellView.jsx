var React       = require('react'),
    Header      = require('./headerView.jsx'),
    Description = require('./descriptionView.jsx'),
    UserText    = require('./userTextView.jsx'),
    Dropdown    = require('./dropdownView.jsx'),
    localViewBank = {
      Header: Header,
      Description: Description,
      UserText: UserText,
      Dropdown: Dropdown,
    };

module.exports = React.createClass({
  // updateAnswer: function(answer) {
  //   var cellId = this.props.id;
  //   this.props.updateAnswer(answer, cellId);
  // },
  render: function() {
    var body,
        dropdown;

    if (this.props.type == "unselected") {
      body = (
        <div>
          <span> no form selected by admin </span>
        </div>
      )
    } else {
      var cellBody = (
        React.createElement(
          localViewBank[this.props.type], {
            cellId:       this.props.id,
            questionId:   this.props.questionId,
            formTitle:    this.props.formTitle,
            formContent:  this.props.formContent,
            updateAnswer: this.props.updateAnswer
          }
        )
      )
            // updateAnswer: this.updateAnswer
      body = (
        <div>
          {cellBody}
          {dropdown}
        </div>
      )
    }
    return (
      <td>
        {body}
      </td>
    )
  }
});
