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

  render: function() {

    var columnList = this.state.columns.map(function(column) {
      return (
        <div key={column} className='board' className='grid_3'>
          <Column key={column} _id={column} boardUsers={this.state.users} />
        </div>
      )
    }.bind(this));

    return (
      <div>
        <button onClick={this.props.handleBoardList}>Return To Board List</button>
        <p>{this.state.name}
        <button onClick={this.handleAddColumn}>Add Column</button>
        </p>
        {columnList}
      </div>
    );
  }

});

module.exports = Board;
