var React = require('react')

var User = React.createClass({
  render: function() {
    return (
      <div>
      <form action="/checkLogin"
        Username:
        <input type='text' name='username'/>
        Password:
        <input type='text' name='password'/>
        <button>Login</button>
      </form>
      </div>
    )
  }
})

module.exports = User
