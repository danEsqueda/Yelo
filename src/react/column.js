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

  removeCard: function(cardId) {
    var newCards = this.state.cards.filter(function(card) {
      return card !== cardId
    });
    this.state.cards = newCards;
  },

  columnDrop: function(e) {
    var data = JSON.parse(e.dataTransfer.getData('application/json'));
    if(this.props.index !== data.columnIndex) {
      this.props.removeForeignCard(data._id, data.columnIndex);
      this.setState({
        cards: [data._id].concat(this.state.cards)
      });
      this.updateColumn();

    } else if(data.cardIndex !== 0) {
      this.removeCard(data._id);
      this.state.cards.splice(0, 0, data._id);
      this.forceUpdate();
      this.updateColumn();
    }
  },

  cardInsert: function(e, data, sourceIndex) {
    var slot =
      (e.pageY - e.currentTarget.offsetTop) < (e.currentTarget.offsetHeight / 2) ?
      sourceIndex : sourceIndex + 1;

    if(this.props.index !== data.columnIndex) {
      this.props.removeForeignCard(data._id, data.columnIndex);
    }
    else {
      this.removeCard(data._id);
      if(data.cardIndex < slot) {
        slot--;
      }

    }
    this.state.cards.splice(slot, 0, data._id);
    this.forceUpdate();
    this.updateColumn();
  },

  dragOver: function(e) {
    e.preventDefault();
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

    var cardList = this.state.cards.map(function(card, index) {
      return <Card
        key={card}
        _id={card}
        ref={index}
        index={index}
        parentIndex={this.props.index}
        boardUsers={this.props.boardUsers}
        cardInsert={this.cardInsert}
        />
    }.bind(this));

    return (
      <div className='column' onDragOver={this.dragOver} onDrop={this.columnDrop} >
        <p>{this.state.name}</p>
        {cardList}
        <button onClick={this.handleAddCard}>Add Card</button>
      </div>
    );
  }

});

module.exports = Column;
