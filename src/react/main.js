var React = require('react');
var Board = require('./board');
var BoardList = require('./boardList');

var Main = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: <BoardList />
    };
  },

  handleLogin: function() {
      this.setState({
        currentlyShowing: <BoardList />
      })
  },

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} />
      })
  },

  render: function() {

    return (
      <div>
        {this.state.currentlyShowing}
      </div>
    );
  }

});

module.exports = Main;
