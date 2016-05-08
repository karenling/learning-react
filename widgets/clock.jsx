var React = require('react');

var Clock = React.createClass({
  getInitialState: function() {
    return ({ time: new Date() })
  },
  componentDidMount: function() {
    this.clockID = setInterval(function() {
      this.setState({ time: new Date() })
    }.bind(this), 60)
  },
  componentWillUnmount: function() {
    window.clearInterval(this.clockID);
  },
  render: function() {
    return(
      <div> { this.state.time.toString() } </div>
    )
  }
});

module.exports = Clock;
