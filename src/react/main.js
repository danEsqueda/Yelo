var React = require('react');
var Board = require('./board');
var BoardList = require('./boardList');

var Main = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: <BoardList handleBoard={this.handleBoard} />
    };
  },

  /*handleLogin: function() {
      this.setState({
        currentlyShowing: <BoardList />
      })
  },*/

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} _id={key} />
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
