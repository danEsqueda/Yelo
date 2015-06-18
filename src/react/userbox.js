var React = require('react');

var ChooseUserBox = React.createClass({

  getInitialState: function() {
    return {
      initial: this.props.initialActive
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
                    className={this.props.className}>{this.props.user}</div>
    )
  }

});

module.exports = ChooseUserBox;
