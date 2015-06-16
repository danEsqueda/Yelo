var mockBoards = [{key:1, name: 'firstBoard'}, {key:2, name: 'secondBoard'}];

var React = require('react');

var $ = require('jquery');

var BoardList = React.createClass({
  getInitialState: function() {
    return {
      boards: []
    }
  },

  componentDidMount: function() {
    var _this = this;
    $.get(/*'/boards/'*/null, function(err, data) {
      if(err) {console.log('theres been an error')};
      _this.setState({
        boards: mockBoards
      })
    })
  },

  render: function() {
    var boardList = this.state.boards.map(function(board) {
      return <li><a href={'/boards/' + board.key}>{board.name}</a></li>
    });

    return (
      <div>
        {boardList}
      </div>
    )
  }
})

module.exports = BoardList;
