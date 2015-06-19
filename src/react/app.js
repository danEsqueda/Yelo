var React = require('react');
var User = require('./user');
var Header = require('./header');
var ShowBoards = require('./showBoards');
var Main = require('./main');
var Splash = require('./splash');
var BoardList = require('./boardList');
var Board = require('./board');


var App = React.createClass({
  // TODO: Hookup the check to see if user is authenticated
  getInitialState: function() {
    return {
      user: 'Log in!',
      boards: [],
      currentBoard: 'No Boards',
      showBoardList: true,
      pageToShow:
      <div className='splash'>
        <Splash />
        <User handleSuccessfulLogin={this.showBoards} handleUserLoad={this.handleUserLoad} />
      </div>
    }
  },

  handleBoardLoad: function(boards) {
    this.setState({
      boards: boards
    })
  },

  handleBoardName: function(key) {
    for(var i = 0; i < this.state.boards.length; i++) {
      if(this.state.boards[i]._id === key) {
        this.setState({ currentBoard: this.state.boards[i].name })
        return
      }
    }
  },

  handleUserLoad: function(user) {
    this.setState({
      user: user.fullName
    })
  },

  handleUserName: function(key) {
    if(this.state.user._id === key) {
      this.setState({ user: this.state.user.fullName})
      return
    }
  },

  showBoards: function() {
    this.setState({
      pageToShow: <Main showBoardList={this.state.showBoardList} handleBoardName={this.handleBoardName} handleBoardLoad={this.handleBoardLoad} />
    });
  },

  boardListToggle: function() {
    this.setState({
      showBoardList: !this.state.showBoardList,
      pageToShow: <Main showBoardList={!this.state.showBoardList} handleBoardName={this.handleBoardName} handleBoardLoad={this.handleBoardLoad} />

    })
  },

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} _id={key} handleBoardList={this.handleBoardList}/>
      })
      this.handleBoardName(key)
  },

  render: function() {
    return (
      <main>
        <Header user={this.state.user}
                boards={this.state.boards}
                boardListToggle={this.boardListToggle}
                currentBoard={this.state.currentBoard} />
        {this.state.pageToShow}

      </main>
    );
  }
});

React.render(<App />, document.getElementById('app'));
