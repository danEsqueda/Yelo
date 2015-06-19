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

  handleAddColumn: function(e) {
    var newColumn = {
      name: '',
      cards: []
    };

    $.ajax({
      method: 'POST',
      data: JSON.stringify(newColumn),
      contentType: 'application/json',
      url: '/columns/',
      success: function(data, status, xhr) {
        this.setState({
          columns: this.state.columns.concat([data._id])
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ERROR in POST /columns/');
      }.bind(this),
    });
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

    return (
      <div id="board">
        <button onClick={this.props.handleBoardList}>Return To Board List</button>
        <p>{this.state.name}
        <button onClick={this.handleAddColumn}>Add Column</button>
        </p>
        <div id="column-container">
          {columnList}
        </div>
      </div>
    );
  }

});

module.exports = Board;
