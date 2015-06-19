var React = require('react');

var $ = require('jquery');

var Board = require('./board');

var BoardList = React.createClass({
  getInitialState: function() {
    return {
      boards: [],
      boardName: ''
    }
  },

  componentDidMount: function() {
    $.get('/boards', function(data, status) {
      this.setState({
        boards: data
      })
      this.props.handleBoardLoad(data)
    }.bind(this))
  },

  updateBoardName: function(e) {
    this.setState({
      boardName: e.target.value
    })
  },

  addBoard: function() {
    $.ajax({
      url:'/boards',
      type:'POST',
      data:JSON.stringify({name: this.state.boardName}),
      contentType: 'application/json',
      success: function(data) {
        this.setState({
          boards: this.state.boards.concat([data]),
          boardName: ''
        })
      }.bind(this),
      error: function(err) {
        console.log(err)
      }

    })
  },

  deleteBoard: function(key) {
    $.ajax({
      url: '/boards/' + key,
      type: 'DELETE',
      success: function(result) {
        console.log(result);
        this.setState({
          boards: this.state.boards.filter(function(board) { return board._id !== key })
        })
      }.bind(this),
      error: function(err) {
        console.log(err)
      }
    })
  },

  render: function() {
    var boardList = this.state.boards.map(function(board) {
      return <div key={board._id}>
              <button onClick={this.props.handleBoard.bind(null,board._id)}>{board.name}</button>
              <button onClick={this.deleteBoard.bind(null, board._id)}>Delete {board.name}</button>
            </div>
    }.bind(this));

    return (
      <div>
        {boardList}
        <input type='text' value={this.state.boardName} onChange={this.updateBoardName}></input>
        <button onClick={this.addBoard}>Create Board</button>
      </div>
    )
  }
})

module.exports = BoardList;
