var React = require('react');

var $ = require('jquery');

var Board = require('./board');

var BoardList = React.createClass({
  getInitialState: function() {
    return {
      boards: []
    }
  },

  componentDidMount: function() {
    var _this = this;
    $.get('/boards', function(data, status) {
      _this.setState({
        boards: data
      })
    })
  },

  /*handleClick: function(e) {
    console.log('clicked ' + e.target.key);
    this.props.handleBoard(e.target.key);
  },*/

  render: function() {
    var boardList = this.state.boards.map(function(board) {
      return <button key={board._id} onClick={this.props.handleBoard.bind(null,board._id)}>{board.name}</button>
    }.bind(this));

    return (
      <div>
        {boardList}
      </div>
    )
  }
})

module.exports = BoardList;
