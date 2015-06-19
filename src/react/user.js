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
      <div id='login-form'>
        <form>
          <input type="text" name="username" placeholder="Username" onChange={this.handleChangeUsername} />
          <input type="text" name="password" placeholder="Password" onChange={this.handleChangePassword} />
          <input type="submit" value="Log In" onClick={function(event) { event.preventDefault(); this.handleLogin(); }.bind(this)}/>
        </form>
      </div>
    );
  }
});

module.exports = User;

