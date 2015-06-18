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

  render: function() {

    var cardList = this.state.cards.map(function(card) {
      return <Card key={card} _id={card} boardUsers=this.props.boardUsers />
    });

    return (
      <div className='column'>
        <p>{this.state.name}</p>
        {cardList}
      </div>
    );
  }

});

module.exports = Column;
