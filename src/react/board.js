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
        <div key={column} className='board' className='grid_3'>
          <Column
            key={column}
            ref={index}
            _id={column}
            index={index}
            removeForeignCard={this.removeForeignCard}
            boardUsers={this.state.users} />
        </div>
      )
    }.bind(this));

    //var boardID = this.props._id;
    //boardID

    return (
      <div>
        <button onClick={this.props.handleBoardList}>Return To Board List</button>
        <p>{this.state.name}
        <button onClick={this.props.handleAddColumn()}>Add Column</button>
        </p>
        {columnList}
      </div>
    );
  }

});

module.exports = Board;
