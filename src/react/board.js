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
      columns: [1,2],
      users: [1]
    });

  },

  render: function() {

    var columnList = this.state.columns.map(function(column) {
      return <Column key={column} />
    });

    return (
      <div className='board'>
        <p>{this.state.name}</p>
        {columnList}
      </div>
    );
  }

});

module.exports = Board;