var React = require('react');

var UserSummaryList = React.createClass({

  render: function() {



    return (
      <div className='summaryInitials'>{this.props.userInitials}</div>
    )
  }
});

module.exports = UserSummaryList;
