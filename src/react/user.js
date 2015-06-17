var React = require('react');
var Main = require('./main');

var User = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },
  handleChangeUsername: function(e) {
   this.setState({
      username: e.target.value
    });
    if (!username) {
      message: 'Please enter a username';
    }
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
      <table>
        <tr>
          <td>Username:</td>
          <td><input type='text' name='username' onChange={this.handleChangeUsername}/></td>
        </tr>
        <tr>
          <td>Password:</td>
          <td><input type='password' name='password' onChange={this.handleChangePassword}/></td>
        </tr>
        <tr><td><span className='message'>{this.state.message}</span></td><td>
          <button onClick={this.handleLogin}>Login</button></td></tr>
      </table>
      <p><a href='#'>Register for an account</a></p>
      </div>
    );
  }
});

module.exports = User;

