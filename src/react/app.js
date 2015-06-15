var React = require('react')
var User = require('./user')

var App = React.createClass({
  render: function() {
    return (
      <main>
        <h1>Welcome to Yelo</h1>
        <User />
      </main>
    )
  }
})

React.render(<App />, document.getElementById('app'))
