var React = require('react');
var Card = require('card');
var $ = require('jquery');

var Column = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      cards: []
    };
  },

  componentDidMount: function() {
    $.get('/column/' + this.props.id, function(data, status) {
      this.setState({
        name: data.name,
        cards: data.cards
      });
    });
  },

  render: function() {

    var cardList = this.state.cards(function(card) {
      return <Card id={card} />
    });

    return (
      <div>
        {cardList}
      </div>
    );
  }

});

module.exports = Column;
