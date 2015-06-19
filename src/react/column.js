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
    } else if(data.cardIndex !== 0) {
      this.removeCard(data._id);
      this.state.cards.splice(0, 0, data._id);
      this.forceUpdate();
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
  },

  dragOver: function(e) {
    e.preventDefault();
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
      </div>
    );
  }

});

module.exports = Column;
