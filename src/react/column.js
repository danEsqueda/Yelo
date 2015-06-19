var React = require('react');
var Card = require('./card');
var $ = require('jquery');

var Column = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      cards: []
    };
  },

  componentDidMount: function() {
    $.get('/columns/' + this.props._id, function(data, status) {
      this.setState({
        name: data.name,
        cards: data.cards
      });
    }.bind(this));

    //TEST DATA
    // this.setState({
      // name: 'My new column!',
      // cards: [1,2],
    // });

  },

  handleAddCard: function() {
    var newCard = {
      name: '',
      content: '',
      users: [],
      comments: [],
      colors: [],
    };

    $.ajax({
      method: 'POST',
      data: JSON.stringify(newCard),
      contentType: 'application/json',
      url: '/cards/',
      success: function(data, status, xhr) {
        this.setState({
          cards: this.state.cards.concat([data._id])
        });
        this.updateColumn();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ERROR in POST /cards/');
      }.bind(this),
    });
  },

  updateColumn: function() {
    var changeColumn = {
      name: this.state.name,
      cards: this.state.cards
    }

    $.ajax({
      method: 'PUT',
      data: JSON.stringify(changeColumn),
      contentType: 'application/json',
      url: '/columns/' + this.props._id,
      success: function(data, status, xhr) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('ERROR in POST /cards/');
      }.bind(this),
    });
  },

  render: function() {

    var cardList = this.state.cards.map(function(card) {
      return <Card key={card} _id={card} boardUsers={this.props.boardUsers} />
    }.bind(this));

    return (
      <div className='column'>
        <p>{this.state.name}</p>
        {cardList}
        <button onClick={this.handleAddCard}>Add Card</button>
      </div>
    );
  }

});

module.exports = Column;
