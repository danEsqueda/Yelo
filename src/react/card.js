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
      editView: false,
      contentButton: 'Save',
      contentView: <textarea name='content'
                             value={this.props.content}
                             onChange={this.updateContent}/>
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

<<<<<<< HEAD
=======
  handleAddComment: function(e) {
    e.preventDefault();
    var newComment = this.refs.newComment.findDOMNode().value;
    this.setState({
      comments: this.state.comments.concat([newComment])
    });
    this.refs.newComment.getDOMNode().value = '';
  },

  handleColors: function(e) {

    this.setState({
      colors: this.state.colors.concat(['blue'])
    });
    console.log(e.target.class);
    console.log(e.target.className);

  },

>>>>>>> add color div's
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
<<<<<<< HEAD
=======
  },

  toggleContent: function(e) {
    e.preventDefault();
    if (this.state.contentButton === 'Save') {

      this.setState({
        contentView: this.state.content,
        contentButton: 'Edit'
      });
    } else {
      this.setState({
        contentView: <textarea name='content'
                               defaultValue={this.state.content}
                               value={this.props.content}
                               onChange={this.updateContent}/>,
        contentButton: 'Save'
      });
    }
>>>>>>> add color div's
  },

  render: function() {
    var view;
    var buttonName;
    var light;
    var setColors = ['blue', 'green', 'red', 'yellow'];

    var clickColors = setColors.map(function(setColor) {
      return <div onClick={this.handleColors}
                  refs={setColor}
                  className={setColor}>{setColor}</div>
    });

    var coms = this.state.comments.map(function(comment) {
      return <p>{comment}</p>
    });
    var colors = this.state.colors.map(function(color) {
      return <div name={color} className='color-box'></div>
    });
    var users = this.state.users.map(function(user) {
      return <div className={user}>{user}</div>
    });
    if (this.state.editView) {
      view = <form>
        Enter Card Name:
        <input type='text'
               value={this.props.name}
               onChange={this.updateName} />
        Card Content:
        {this.state.contentView}
        <button onClick={this.toggleContent}>{this.state.contentButton}</button>
        Colors: {clickColors}
        Comments:
        <textarea name='comments' value={this.props.comments} ref='newComment' />
        <button onClick={this.handleAddComment}>Add</button>
        {coms}
      </form>;
      buttonName = 'Done';
    } else {
      view = <div>
        <h3>{this.state.name}</h3>
        {colors}
        <p>{this.state.comments.length} comments</p>
        {users}
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

