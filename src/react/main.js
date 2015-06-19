var React = require('react');
var Board = require('./board');
var BoardList = require('./boardList');

var Main = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: null,//<BoardList handleBoard={this.handleBoard} handleBoardLoad={this.props.handleBoardLoad} />
      showBoardList: true
    };
  },

  handleBoardList: function() {
      this.setState({
        currentlyShowing: <BoardList handleBoard={this.handleBoard} handleBoardLoad={this.props.handleBoardLoad} />
      })
  },

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} _id={key} handleBoardList={this.handleBoardList}
        handleAddColumn={this.handleAddColumn}/>
      })
      this.props.handleBoardName(key)
  },

  render: function() {

    return (
      <div>
        <div>
          {this.state.currentlyShowing}
        </div>
      </div>
    );
  }

});

module.exports = Main;
