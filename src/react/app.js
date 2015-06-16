var React = require('react');
var User = require('./user');
var Header = require('./header');
var ShowBoards = require('./showBoards');
var Main = require('./main')
var App = React.createClass({
  // TODO: Hookup the check to see if user is authenticated
  getInitialState: function() {
    return {
      pageToShow: <div>
        <Header />
        <h1>Welcome to Yelo</h1>
        <button onClick={this.showBoards}>Board Selected</button>
      </div>
    }
  },
  
  showBoards: function() {
    this.setState({
      pageToShow: <Main />
    });
  },
  
  render: function() {
    // var loggedIn = true;
    // var pageToShow;
    // if (loggedIn) {
      // pageToShow = <Main />
    // }
    // else {
      // pageToShow = <User />
    // }
    return (
      <main>
        {this.state.pageToShow}
      </main>
    );
  }
});

React.render(<App />, document.getElementById('app'));
