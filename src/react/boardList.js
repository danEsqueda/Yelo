//var mockBoards = [{key:1, name: 'firstBoard'}, {key:2, name: 'secondBoard'}];

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

  render: function() {
    var boardList = this.state.boards.map(function(board) {
      return <li key={board._id}><a href={'/boards/' + board._id}>{board.name}</a></li>
    });

    return (
      <div>
        {boardList}
      </div>
    )
  }
})

module.exports = BoardList;
