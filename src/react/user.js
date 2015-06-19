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
  },
  handleChangePassword: function(e) {
   this.setState({
      password: e.target.value
    });
  },
  handleLogin: function(){
    var checkLogin = {username: this.state.username, password: this.state.password}
    var endpoint = '/login';
      $.ajax({
        url: endpoint,
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(checkLogin),
        cache: false,
        success: function(data) {
          this.props.handleSuccessfulLogin();
          this.props.handleUserLoad(data)
        }.bind(this),
        error: function(xhr, status, err) {
          console.log('Error logging in!');
        }.bind(this)
      });
  },
  render: function() {
    return (
      <div>
      <table id="splashtable">
        <tr className="splashtd">
          <td className="splashtd">Username:</td>
          <td className="splashtd"><input type="text" name="username" onChange={this.handleChangeUsername}/></td>
        </tr>
        <tr className="splashtd">
          <td className="splashtd">Password:</td>
          <td className="splashtd"><input type="password" name="password" onChange={this.handleChangePassword}/></td>
        </tr>
        <tr className="splashtd"><td className="splashtd"><span className="message">{this.state.message}</span></td><td>
          <button id="splashbutton" onClick={this.handleLogin}>Login</button></td></tr>
      </table>
      <p><a href="#" id="splasha">Register for an account</a></p>
      </div>
    );
  }
});

module.exports = User;

