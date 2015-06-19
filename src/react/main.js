var React = require('react');
var Board = require('./board');
var BoardList = require('./boardList');

var Main = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: <BoardList handleBoard={this.handleBoard} />
    };
  },

  handleAddColumn: function() {
    console.log('get to main line 13');
  },

  handleBoardList: function() {
      this.setState({
        currentlyShowing: <BoardList handleBoard={this.handleBoard} />
      })
  },

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} _id={key} handleBoardList={this.handleBoardList}
        handleAddColumn={this.handleAddColumn}/>
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
