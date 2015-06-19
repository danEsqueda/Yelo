var React = require('react');
var Board = require('./board');
var BoardList = require('./boardList');

var Main = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: <BoardList handleBoard={this.handleBoard} handleBoardLoad={this.props.handleBoardLoad} />
    };
  },

  handleBoardList: function() {
      this.setState({
        currentlyShowing: <BoardList handleBoard={this.handleBoard} handleBoardLoad={this.props.handleBoardLoad} />
      })
  },

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} _id={key} handleBoardList={this.handleBoardList}/>
      })
      this.props.handleBoardName(key)
  },

  render: function() {

    return (
      <div>
        <div className={this.props.showBoardList ? '' : 'hidden'}>
          <BoardList handleBoard={this.handleBoard} handleBoardLoad={this.props.handleBoardLoad} />
        </div>
          {this.state.currentlyShowing}
      </div>
    );
  }

});

module.exports = Main;
