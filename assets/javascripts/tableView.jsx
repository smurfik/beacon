var React = require('react'),
    ViewBank = require('./viewBank.js'),
    NewRowView = require('./newRowView.jsx');

module.exports = React.createClass({
  render: function() {
    var columnHeaders = [],
        rows = [],
        i;

    for (i = 0; i < this.props.tableRows.length; i++) {
      rows.push(
        <NewRowView
          id={i}
          key={i}
          element        = {this.props.tableRows[i]}
          columns        = {this.props.tableRows[i].columns}
          updateAnswer   = {this.props.updateAnswer}
        />
          // previewAnswers = {this.props.previewAnswers}
      );
    }
    for (i = 0; i < this.props.tableRows[0].columns.length; i++) {
      columnHeaders.push(<th key={i}> Column {i+1} </th>);
    }
    return(
      <div className="table-form">
      <h2>{this.props.formTitle}</h2>
        <table>
          <thead>
            <tr>
              {columnHeaders}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
});
