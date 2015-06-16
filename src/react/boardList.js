var mockBoards = [{key:1, name: 'firstBoard'}];

var React = require('react');

var $ = require('jquery');

var BoardList = React.createClass({
  getInitialState: function() {
    return {
      key: '',
      name: '',
      boards: []
    }
  },

  componentDidMount: function() {
    $.get('/boards/', function(err, data) {
      if(err) {console.log('theres been an error')};
      this.setState({
        boards: data.boards
      })
    })
  },

  render: function() {
    var boardList = this.state.boards(function(board) {
      return <Board key={board.key} />
    });

    return (
      <div>
        {boardList}
      </div>
    )

    /*return (
      <main>
        <a href={'/boards/' + mockBoards[0].key}>{mockBoards[0].name}</a>
      </main>
    )*/
  }
  // get token from login service and set state to token
  /*render: function() {
    if(this.props.token === '') {
      <p>Please login</p>
    } else {
      <ul>
      mockBoards.forEach(function(board) {
        <li><a href={'/board/' + board.id}></a></li>
      })
      </ul>
    }
  }*/
})

module.exports = BoardList;
