var React = require('react');

var ColorBox = React.createClass({

  getInitialState: function() {
    return {
      active: this.props.initialActive
    }
  },

  handleActivation: function() {
    this.props.colorToggled(!this.state.active, this.props.color);
    this.setState({
      active: !this.state.active
    });

  },

  render: function() {
    return(
      <div onClick={this.handleActivation}
                    className={this.props.color +
                      (this.state.active ? ' activeColor': '')}></div>
    )
  }
});

module.exports = ColorBox;
