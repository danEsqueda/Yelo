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
        <div key={column} className='board' className='grid_3'>
          <Column key={column} _id={column} boardUsers={this.state.users} />
        </div>
      )
    }.bind(this));

    return (
      <div>
        <button onClick={this.props.handleBoardList}>Return To Board List</button>
        <p>{this.state.name}</p>
        {columnList}
      </div>
    );
  }

});

module.exports = Board;
