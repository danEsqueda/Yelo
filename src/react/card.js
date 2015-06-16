var React = require('react');
var $ = require('jquery');

var Card = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      content: '',
      colors: [],
      comments: [],
      users: []
    };
  },

  componentDidMount: function() {
    $.get('/card/' + this.props.key, function(data, status) {
      this.setState({
        name: data.name,
        content: data.content,
        colors: data.colors,
        comments: data.comments,
        users: data.users
      });
    });
  },

  render: function() {

    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>{this.props.content}</p>
        <p>{this.props.colors}</p>
        <p>{this.props.comments}</p>
        <p>{this.props.users}</p>
        <p>{this.props.columnId}</p>
      </div>
    );
  }
});

module.exports = Card;
