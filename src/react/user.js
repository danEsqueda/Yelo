var React = require('react');

var User = React.createClass({
  handleChangeUsername: function(e) {
   this.setState({
      username: e.target.value
    });
  },
  handleChangePassword: function(e) {
   this.setState({
      password: e.target.value
    });
  },
  handleLogin: function(){
    console.log('getting here?');
    var username = this.state.username;
    var password = this.state.password;
    console.log(username + ' ' + password);
    var note = {author: 'Kendall', note: this.state.note};
    //this.props.addNote(note);
    //this.setState({note: ''});
  },
  render: function() {
    return (
      <div>
        Username:
        <input type='text' name='username' onChange={this.handleChangeUsername}/>
        Password:
        <input type='password' name='password' onChange={this.handleChangePassword}/>

        <button onClick={this.handleLogin}>Login</button>
        <p><a href='#'>Or click to create a new account</a></p>
      </div>
    );
  }
});

module.exports = User;
