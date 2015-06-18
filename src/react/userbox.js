var React = require('react');

var UserBox = React.createClass({

  getInitialState: function() {
    return {
      active: this.props.initialActive
    }
  },

  handleActivation: function() {
    this.props.userToggled(!this.state.active, this.props.user)
    this.setState({
      active: !this.state.active
    });
  },

  render: function() {
    return (
      <div onClick={this.handleActivation}
           className={this.props.user +
                      (this.state.active ? ' activeUser': '')}></div>
    )
  }

});
