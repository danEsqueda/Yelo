var React = require('react');
var User = require('./user');
var Header = require('./header');
var ShowBoards = require('./showBoards');

var App = React.createClass({
  // TODO: Hookup the check to see if user is authenticated
  render: function() {
    var loggedIn = false;
    var pageToShow;
    if (loggedIn) {
      pageToShow = <ShowBoards />
    }
    else {
      pageToShow = <User />
    }
    return (
      <main>
        <Header />
        <h1>Welcome to Yelo</h1>
        {pageToShow}
      </main>
    );
  }
});

React.render(<App />, document.getElementById('app'));
