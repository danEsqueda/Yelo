var React = require('react');
var Column = require('./column');
var $ = require('jquery');

var Board = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      columns: [],
      users: [],

    };
  },

  componentDidMount: function() {
    $.get('/boards/' + this.props._id, function(data, status) {
      this.setState({
        name: data.name,
        columns: data.columns,
        users: data.users
      });
    }.bind(this));

    //TEST DATA
    // this.setState({
      // name: 'My new board!',
      // columns: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      // users: [1]
    // });

  },

  render: function() {

    var columnList = this.state.columns.map(function(column) {
      return (
        <Column key={column} _id={column} boardUsers={this.state.users} />
      )
    }.bind(this));

    //var boardID = this.props._id;
    //boardID

    return (
      <div id="board">
        <button onClick={this.props.handleBoardList}>Return To Board List</button>
        <p>{this.state.name}
        </p>
        <div id="column-container">
          {columnList}
        </div>
      </div>
    );
  }

});

module.exports = Board;
