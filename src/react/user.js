var React = require('react');

var User = React.createClass({
  getInitialState: function(){
    return {
      message: 'Please Log In'
    }
  },
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
    var checkLogin = {username: this.state.username, password: this.state.password}
    // TODO: merge with express router to get correct route
    var endpoint = 'http://localhost:3000/login';
      $.ajax({
        url: endpoint,
        dataType: 'json',
        type: 'post',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: checkLogin,
        cache: false,
        success: function(data) {
          console.log('success here');
        }.bind(this),
        error: function(xhr, status, err) {
          // TODO: Move to success once link is working
          console.log('Error logging in!');
        }.bind(this)
      });
  },
  render: function() {
    return (
      <div>
        {this.state.message}
        <p></p>
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
