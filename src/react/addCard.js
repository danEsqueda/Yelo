var React = require('react');
var Card = require('./card');

var CardButton = React.createClass({

  getInitialState: function() {
    getInitialState: function() {
    return {
      newName: '',
      newContent: '',
      newColors: [],
      newComments: [],
      newComment: '',
      newUsers: [],
      boardUsers: [],
      editView: false,
      contentButton: 'Save',
    };
  }


  handleNewCard: function(e) {
    e.preventDefault();

  }

  render: function() {
    return (
      <form>
        Enter Card Name:
        <input type='text'
               value={this.state.newName}
               onChange={this.updateName} />

        Card Content:
        {(this.state.contentButton === 'Save') ? <textarea name='content'
                             value={this.state.newContent}
                             onChange={this.updateContent}/> : <div>{this.state.newContent}</div>}
        <button onClick={this.toggleContent}>{this.state.contentButton}</button>

        Colors: {clickColors}
        Users: {clickUsers}
        Comments:
        <textarea placeholder="Add comment..." value={this.state.newComment} onChange={this.handleNewComment} />
        <button onClick={this.handleAddComment}>Add</button>
        {coms}
        <button onClick={this.handleNewCard}>Done</button>
      </form>;
    )
  }
})
