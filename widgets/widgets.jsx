var React = require('react');
var ReactDOM = require('react-dom');
var Autocomplete = require('./autocomplete');
var Tabs = require('./tabs');
var Clock = require('./clock');
var Weather = require('./weather');

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

var listOfTabs = [
  { title: 'Home', content: 'Home area' },
  { title: 'About', content: 'About area' },
  { title: 'Blog', content: 'Blog area' }
]

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Widgets />, document.getElementById('main'));
})
