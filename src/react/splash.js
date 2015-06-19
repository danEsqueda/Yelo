var React = require('react');

var Splash = React.createClass({
  render: function() {
    return (
      <div className='splash'>
        <img id="splashimg" src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcST98GEo__nU9M-ct5ETQyea18V7XhIA6DoVxILyxkNg5wxUVGq' />
        <h2 id="splashh2">Free. Functional. Anything else?</h2>
      </div>
    )
  }
})

module.exports = Splash;
//<img className='logo' src='http://edtechtimes.com/wp-content/uploads/2014/05/CodeFellows.png'/>
