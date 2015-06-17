var React = require('react');
var User = require('./user');
var Header = require('./header');
var ShowBoards = require('./showBoards');
var Main = require('./main');
var Splash = require('./splash');


var App = React.createClass({
  // TODO: Hookup the check to see if user is authenticated
  getInitialState: function() {
    return {
      pageToShow:
      <div className='splash'>
        <Splash />
        <User />
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

//<button onClick={this.showBoards}>Login</button>

React.render(<App />, document.getElementById('app'));
