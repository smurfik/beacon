var Header      = require('./headerView.jsx'),
    Description = require('./descriptionView.jsx'),
    UserText    = require('./userTextView.jsx');
    Dropdown    = require('./dropdownView.jsx'),
    Table       = require('./tableView.jsx'),

module.exports = {
  Header: Header,
  Description: Description,
  UserText: UserText,
  Dropdown: Dropdown,
  Table: Table,
  selected: function() {
    return <div></div>
  }
};
