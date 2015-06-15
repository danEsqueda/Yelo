var React = require('react');

var RegisterUser = React.createClass({
  render: function() {
    return (
      <div>
        Fullname:
        <input type='text' />
        Username:
        <input type='text' />
        Password:
        <input type='password' />
        Email:
        <input type='text' />
        Photo:
        <input type='file' accept='image/*' />
      </div>
    );
  }
});

module.exports = RegisterUser;
