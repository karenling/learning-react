var React = require('react');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      weather: '...',
      temp: '...'
    }
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(function(position){
      var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=???'

      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var response = JSON.parse(request.responseText);
          this.setState({
            weather: response['weather'][0]['main'],
            temp: response['main']['temp']
          })
        } else {
          // error
        }
      }.bind(this)
      request.onerror = function() {
        // connection error
      }
      request.send();
    }.bind(this))
  },
  render: function() {
    return(
      <div>
        Current Weather: { this.state.weather }
        <br />
        Current Temperature: { this.state.temp }
      </div>
    )
  }
});

module.exports = Weather;
