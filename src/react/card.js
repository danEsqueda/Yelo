var React = require('react');
var $ = require('jquery');
var ColorBox = require('./colorbox');
var UserSummaryList = require('./userSummaryList');
var ChooseUserBox = require('./userbox');

var Card = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      content: '',
      colors: [],
      comments: [],
      users: [],
      boardUsers: [],
      editView: false,
      contentButton: 'Save',
      contentView: <textarea name='content'
                             value={this.props.content}
                             onChange={this.updateContent}/>
    };
  },

  colorToggled: function(active, color) {

    if (active) {
      this.setState({
        colors: this.state.colors.concat([color])
      });
    } else {
      var newColors = this.state.colors.filter(function(element) {
        return element !== color
      });
      this.setState({
        colors: newColors
      });
    }
  },

  userToggled: function(active, newUser) {
    if (active) {
      this.setState({
        users: this.state.users.concat([newUser])
      });
    } else {
      var selectedUsers = this.state.users.filter(function(user) {
        return user !== newUser
      });
      this.setState({
        users: selectedUsers
      });
    }
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

  handleAddComment: function(e) {
    e.preventDefault();
    var newComment = this.refs.newComment.getDOMNode().value;
    this.setState({
      comments: this.state.comments.concat([newComment])
    });
    this.refs.newComment.getDOMNode().value = '';
  },

  handleColors: function(e) {

    this.setState({
      colors: this.state.colors.concat([e.target.className])
    });

  },

  componentDidMount: function() {
    $.get('/cards/' + this.props._id, function(data, status) {

      this.setState({
        name: data.name,
        content: data.content,
        colors: data.colors,
        comments: data.comments,
      });

      data.users.forEach(function(id) {
        $.get('/users/' + id, function(userData, status) {
          this.setState({
            users: this.state.users.concat([userData.fullName])
          });
        }.bind(this));
      }.bind(this));

      this.props.boardUsers.forEach(function(id) {
        $.get('/users/' + id, function(userData, status) {
          this.setState({
            boardUsers: this.state.boardUsers.concat([userData.fullName])
          });
        }.bind(this));
      }.bind(this));

    }.bind(this));
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

  },



  render: function() {
    var view;
    var buttonName;
    var setColors = ['blue', 'green', 'red', 'yellow'];

    var summaryUsers = this.state.users.map(function(user) {
      return <UserSummaryList userInitials={user.replace(/[^A-Z]/g, '')} />
    }.bind(this));

    var clickColors = setColors.map(function(setColor) {
      var active = false;
      for (var i = 0; i < this.state.colors.length; i++) {
        if (setColor === this.state.colors[i]) {
          active = true;
          break;
        }
      }
      return <ColorBox colorToggled={this.colorToggled} color={setColor} initialActive={active} />
    }.bind(this));

    var clickUsers = this.state.boardUsers.map(function(boardUser) {
      var active = false;
      for (var i = 0; i < this.state.users.length; i++) {

        if (boardUser === this.state.users[i]) {
          active = true;
          break;
        }
      }
      return <ChooseUserBox userToggled={this.userToggled}
                            user={boardUser}
                            initialActive={active}
                            className={boardUser.fullName + (active ? ' activeUser': '')} />
    }.bind(this));

    var coms = this.state.comments.map(function(comment) {
      return <p>{comment}</p>
    });
    var summaryColors = this.state.colors.map(function(color) {
      return <ColorBox color={color} />
    });
    var users = this.state.users.map(function(user) {
      return <div className={user}>{user}</div>
    });
    if (this.state.editView) {
      view = <form>
        Enter Card Name:
        <input type='text'
               value={this.state.name}
               onChange={this.updateName} />
        Card Content:
        {this.state.contentView}
        <button onClick={this.toggleContent}>{this.state.contentButton}</button>

        Colors: {clickColors}
        Users: {clickUsers}
        Comments:
        <textarea name='comments' value={this.props.comments} ref='newComment' />
        <button onClick={this.handleAddComment}>Add</button>
        {coms}
      </form>;
      buttonName = 'Done';
    } else {
      view = <div>
        <h3>{this.state.name}</h3>
        {summaryColors}
        <p>{this.state.comments.length} comments</p>
        {summaryUsers}
      </div>
      buttonName = 'Edit';
    }
    return (
      <div className='card'>
        {view}
        <button onClick={this.toggleCardView}>{buttonName}</button>
      </div>
    );
  }
});

module.exports = Card;

