var React = require('react');
var Board = require('./board');
var BoardList = require('./boardList');

var Main = React.createClass({
  getInitialState: function() {
    return {
      currentlyShowing: <BoardList handleBoard={this.handleBoard} />
    };
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
        currentlyShowing: <BoardList handleBoard={this.handleBoard} />
      })
  },

  handleBoard: function(key) {
      this.setState({
        currentlyShowing: <Board key={key} _id={key} handleBoardList={this.handleBoardList}
        handleAddColumn={this.handleAddColumn}/>
      })
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
