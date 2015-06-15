var React = require('react')

var User = React.createClass({
  render: function() {
    return (
      <div>
        Username:
        <input type='text' />
        Password:
        <input type='text' />
        <button>Login</button>
      </div>
    )
  }
})

module.exports = User
