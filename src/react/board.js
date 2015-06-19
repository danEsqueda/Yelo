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
  },

  removeForeignCard: function(cardId, columnIndex) {
    this.refs[columnIndex].removeCard(cardId);
    this.refs[columnIndex].forceUpdate();
    this.refs[columnIndex].updateColumn();

  },
  
  render: function() {

    var columnList = this.state.columns.map(function(column, index) {
      return (
        <Column 
            key={column}
            ref={index}
            _id={column}
            index={index}
            removeForeignCard={this.removeForeignCard}
            boardUsers={this.state.users} />
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
