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
    // $.get('/board/' + this.props.key, function(data, status) {
      // this.setState({
        // name: data.name,
        // columns: data.columns,
        // users: data.users
      // });
    // });

    //TEST DATA
    this.setState({
      name: 'My new board!',
      columns: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      users: [1]
    });

  },

  render: function() {

    var columnList = this.state.columns.map(function(column) {
      return (
        <div className='board' className='grid_3'>
          <Column key={column} />
        </div>
      )
    });

    return (
      <div>
        <p>{this.state.name}</p>
        {columnList}
      </div>
    );
  }

});

module.exports = Board;
