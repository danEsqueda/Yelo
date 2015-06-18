var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <div id="header">
        <div id="boards">{this.props.boards}</div>
        <div id="headline">Yelo</div>
        <div id="user">{this.props.currentUser}</div>
      </div>
    );
  }
});

module.exports = Header;
