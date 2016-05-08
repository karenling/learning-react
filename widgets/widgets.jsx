var React = require('react');
var ReactDOM = require('react-dom');
var Autocomplete = require('./autocomplete');

// Tabs Widget
// ---------------------------------------------------------------------

var Header = React.createClass({
  click: function (idx, event) {
    event.preventDefault();
    this.props.updateIdx(idx);
  },
  render: function() {
    var that = this;
    if (this.props.selected == this.props.idx) {
      return(
        <li>
          <h1 className="focused" onClick={ this.click.bind(this, this.props.idx) }>{ this.props.title }</h1>
          <article>efwlajklwef</article>
        </li>
      )
    } else {
      return(
        <li>
          <h1 onClick={ this.click.bind(this, this.props.idx) }>{ this.props.title }</h1>
        </li>
      )
    }

  }
})

var Tabs = React.createClass({
  getInitialState: function() {
    return { tabIdx: 0 }
  },
  updateIdx: function (value) {
    console.log(value)
    this.setState({ tabIdx: value })
  },
  render: function() {
    return(
      <ul>{ this.props.items.map(function(m, index) {
          return(
            <Header key={ index } selected={ this.state.tabIdx } title={ m.title } content={ m.content} idx={ index } updateIdx={ this.updateIdx } />
          )
        }.bind(this))}
      </ul>
    );
  }
});

var listOfTabs = [
  { title: 'Home', content: 'Home area' },
  { title: 'About', content: 'About area' },
  { title: 'Blog', content: 'Blog area' }
]

// Weather Clock Widget
// ---------------------------------------------------------------------

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
      <div>
        { this.state.time.toString() }
      </div>
    )
  }
});

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

var Widgets = React.createClass({
  render: function() {
    return(
      <div>
        <Autocomplete names={ ['Ashley', 'Anderson', 'Andrew', 'Ben', 'Jeffrey', 'Kiko', 'Tanner'] } />
        <Clock />
        <Weather />
        <Tabs items={ listOfTabs } />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Widgets />, document.getElementById('main'));
})
