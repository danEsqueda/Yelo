var React = require('react');
var Board = require('./board');
var BoardList = require('./boardList');

var Main = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: null,//<BoardList handleBoard={this.handleBoard} handleBoardLoad={this.props.handleBoardLoad} />
      showBoardList: true
    };
  },

  componentDidMount: function() {
    $.get('/boards', function(data, status) {
      /*this.setState({
        boards: data
      })*/
      this.props.handleBoardLoad(data)
      if(data.length > 0) {
        this.handleBoard(data[0]._id)
      } else {
        this.handleBoardList()
      }
    }.bind(this))
  },

  handleAddColumn: function(boardID) {
    console.log(boardID);

    var newColumn = {
      name: '',
      cards: []
    };

    $.ajax({
      method: 'POST',
      data: JSON.stringify(newColumn),
      contentType: 'application/json',
      url: '/columns/',
      success: function(data, status, xhr) {
        this.setState({
          //columns: this.state.columns.concat([data._id])
        });
        //this.updateBoard();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ERROR in POST /columns/');
      }.bind(this),
    });
  },

  handleBoardList: function() {
      this.setState({
        currentlyShowing: <BoardList handleBoard={this.handleBoard} handleBoardLoad={this.props.handleBoardLoad} />
      })
  },

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} _id={key} handleBoardList={this.handleBoardList}
        handleAddColumn={this.handleAddColumn}/>
      })
      this.props.handleBoardName(key)
  },

  render: function() {

    return (
      <div>
        {this.state.currentlyShowing}
      </div>
    );
  }

});

module.exports = Main;
