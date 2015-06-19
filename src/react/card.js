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
      newComment: '',
      users: [],
      boardUsers: [],
      editView: false,
      contentButton: 'Save',
    };
  },

  colorToggled: function(active, color) {
    var newColors;

    if (active) {
      newColors = this.state.colors.concat([color]);
    } else {
      newColors = this.state.colors.filter(function(element) {
        return element !== color
      });
    }

    var newCard = {
      name: this.state.name,
      content: this.state.content,
      users: this.state.users.map(function(user) {
        return user._id
      }),
      comments: this.state.comments,
      colors: newColors,
    };

    $.ajax({
      method: 'PUT',
      data: JSON.stringify(newCard),
      contentType: 'application/json',
      url: '/cards/' + this.props._id,
      success: function(data, status, xhr) {
        this.setState({ colors: newColors });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ERROR in PUT /cards/' + this.props._id);
      }.bind(this),
    });
  },

  userToggled: function(active, newUser) {
    var newUsers;

    if (active) {
      newUsers = this.state.users.concat([newUser])
    } else {
      newUsers = this.state.users.filter(function(user) {
        return user._id !== newUser._id;
      });
    }

    var newCard = {
      name: this.state.name,
      content: this.state.content,
      users: newUsers.map(function(user) {
        return user._id
      }),
      comments: this.state.comments,
      colors: this.state.colors,
    };

    $.ajax({
      method: 'PUT',
      data: JSON.stringify(newCard),
      contentType: 'application/json',
      url: '/cards/' + this.props._id,
      success: function(data, status, xhr) {
        this.setState({ users: newUsers });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ERROR in PUT /cards/' + this.props._id);
      }.bind(this),
    });
  },

  toggleCardView: function(e) {
    e.preventDefault();
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

  handleNewComment: function(e) {
    this.setState({
      newComment: e.target.value,
    });
  },

  handleAddComment: function(e) {
    e.preventDefault();

    var newComments = this.state.comments.concat([this.state.newComment]);

    var newCard = {
      name: this.state.name,
      content: this.state.content,
      users: this.state.users.map(function(user) {
        return user._id
      }),
      comments: newComments,
      colors: this.state.colors,
    };

    $.ajax({
      method: 'PUT',
      data: JSON.stringify(newCard),
      contentType: 'application/json',
      url: '/cards/' + this.props._id,
      success: function(data, status, xhr) {
        this.setState({ comments: newComments, newComment: ''});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ERROR in PUT /cards/' + this.props._id);
      }.bind(this),
    });

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
            users: this.state.users.concat([userData])
          });
        }.bind(this));
      }.bind(this));

      this.props.boardUsers.forEach(function(id) {
        $.get('/users/' + id, function(userData, status) {
          this.setState({
            boardUsers: this.state.boardUsers.concat([userData])
          });
        }.bind(this));
      }.bind(this));

    }.bind(this));
  },

  toggleContent: function(e) {
    e.preventDefault();

    if (this.state.contentButton === 'Save') {


      var newCard = {
        name: this.state.name,
        content: this.state.content,
        users: this.state.users.map(function(user) {
          return user._id
        }),
        comments: this.state.comments,
        colors: this.state.colors,
      };

      $.ajax({
        method: 'PUT',
        data: JSON.stringify(newCard),
        contentType: 'application/json',
        url: '/cards/' + this.props._id,
        success: function(data, status, xhr) {
          this.setState({ contentButton: 'Edit' });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('ERROR in PUT /cards/' + this.props._id);
        }.bind(this),
      });

    } else {
      this.setState({
        contentButton: 'Save'
      });
    }

  },
  
  cardDrop: function(e) {
    var data = JSON.parse(e.dataTransfer.getData('application/json'));
    if(data._id === this.props._id) {
      console.log('same card!')
    } else {
      this.props.cardInsert(e, data, this.props.index)
    }
    e.stopPropagation();
  },

  dragStart: function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({_id: this.props._id, cardIndex: this.props.index, columnIndex: this.props.parentIndex}));
  },

  putName: function() {
     var newCard = {
        name: this.state.name,
        content: this.state.content,
        users: this.state.users.map(function(user) {
          return user._id
        }),
        comments: this.state.comments,
        colors: this.state.colors,
      };

      $.ajax({
        method: 'PUT',
        data: JSON.stringify(newCard),
        contentType: 'application/json',
        url: '/cards/' + this.props._id,
        success: function(data, status, xhr) {
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('ERROR in PUT /cards/' + this.props._id);
        }.bind(this),
      });
    },

  render: function() {
    var view;
    var setColors = ['blue', 'green', 'red', 'yellow'];

    var summaryUsers = this.state.users.map(function(user) {
      return <UserSummaryList userInitials={user.fullName.replace(/[^A-Z]/g, '')} />
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

        if (boardUser._id === this.state.users[i]._id) {
          active = true;
          break;
        }
      }
      return <ChooseUserBox userToggled={this.userToggled}
                            user={boardUser}
                            userName={boardUser.fullName}
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
               onChange={this.updateName}
               onBlur={this.putName} />
        Card Content:
        {(this.state.contentButton === 'Save') ? <textarea name='content'
                             value={this.state.content}
                             onChange={this.updateContent}/> : <div>{this.state.content}</div>}
        <button onClick={this.toggleContent}>{this.state.contentButton}</button>

        Colors: {clickColors}
        Users: {clickUsers}
        Comments:
        <textarea placeholder="Add comment..." value={this.state.newComment} onChange={this.handleNewComment} />
        <button onClick={this.handleAddComment}>Add</button>
        {coms}
        <button onClick={this.toggleCardView}>Done</button>
      </form>;
    } else {
      view = <div
        draggable='true'
        onDragStart={this.dragStart}
        onDrop={this.cardDrop}>
        <h3>{this.state.name}</h3>
        {summaryColors}
        <p>{this.state.comments.length} comments</p>
        {summaryUsers}
        <button onClick={this.toggleCardView}>Edit</button>
      </div>
    }
    return (
      <div className='card'>
        {view}
      </div>
    );
  }
});

module.exports = Card;

