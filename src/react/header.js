var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <div id="header">
          <div id="boards"><button>{this.props.currentBoard}</button></div>
          <div id="headline">Yelo</div>
          <div id="user"><button>{this.props.user}</button></div>
        </div>
      </header>
    );
  }
});

module.exports = Header;
