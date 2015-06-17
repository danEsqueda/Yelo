var React = require('react');
var $ = require('jquery');

var Card = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      content: '',
      colors: [],
      comments: [],
      users: [],
      editView: false
    };
  },

  toggleCardView: function() {
    this.setState({
      editView: !this.state.editView
    });
  },

  updateName: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  updateContent: function(e) {
    this.setState({
      content: e.target.value
    });
  },

  componentDidMount: function() {
    $.get('/cards/' + this.props._id, function(data, status) {
      this.setState({
        name: data.name,
        content: data.content,
        colors: data.colors,
        comments: data.comments,
        users: data.users
      });
    }.bind(this));
  },

  render: function() {
    var view;
    var buttonName;
    if (this.state.editView) {
      view = <form>
        Enter Card Name:
        <input type='text'
               value={this.props.name}
               onChange={this.updateName} />
        <textarea name='content' value={this.props.content} onChange={this.updateContent}/>
        <textarea name='comments' value={this.props.comments} />
      </form>;
      buttonName = 'Done';
    } else {
      view = <div>
        <h3>{this.state.name}</h3>
        <p>{this.state.content}</p>
        <p>{this.state.comments.length}</p>
      </div>
      buttonName = 'Edit';
    }
    return (
      <div>
        {view}
        <button onClick={this.toggleCardView}>{buttonName}</button>
      </div>
    );
  }
});

module.exports = Card;
