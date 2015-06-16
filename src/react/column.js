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
    $.get('/column/' + this.props.key, function(data, status) {
      this.setState({
        name: data.name,
        cards: data.cards
      });
    });
  },

  render: function() {

    var cardList = this.state.cards(function(card) {
      return <Card key={card} />
    });

    return (
      <div>
        {cardList}
      </div>
    );
  }

});

module.exports = Column;
