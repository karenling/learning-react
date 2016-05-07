var React = require('react');
var ReactDOM = require('react-dom');

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

// Clock Widget
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
      latitude: '',
      longitude: ''
    }
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(function(position){
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }.bind(this))
  },
  render: function() {
    return(
      <div>{ this.state.latitude } { this.state.longitude }</div>
    )
  }
});

var Widgets = React.createClass({
  render: function() {
    return(
      <div>
        <Clock/>
        <Weather/>
        <Tabs items={ listOfTabs }></Tabs>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Widgets />, document.getElementById('main'));
})
