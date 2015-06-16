var React = require('react');
var Board = require('./board');

var Main = React.createClass({
  getInitialState: function() {
    return {
      board: <Board />,
    };
  },

  render: function() {

    return (
      <div>
        {this.state.board}
      </div>
    );
  }

});

module.exports = Main;
