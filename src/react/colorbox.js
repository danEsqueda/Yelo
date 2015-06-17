var React = require('react');

var ColorBox = React.createClass({

  getInitialState: function() {
    return {
      active: false
    }
  },

  handleActivation: function() {
    this.setState({
      active: !this.state.active
    });
    this.props.colorToggled(this.state.active, this.props.color);
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
