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
      user: null,
      boards: [],
      currentBoard: null,
      pageToShow:
      <div className='splash'>
        <Splash />
        <User handleSuccessfulLogin={this.showBoards} />
      </div>
    }
  },

  showBoards: function() {
    this.setState({
      pageToShow: <Main />
    });
  },

  render: function() {
    return (
      <main>
        <Header user={this.state.user}
                boards={this.state.boards}
                currentBoard={this.state.currentBoard} />
        {this.state.pageToShow}
      </main>
    );
  }
});

React.render(<App />, document.getElementById('app'));
