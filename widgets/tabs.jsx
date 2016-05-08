var React = require('react');
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

module.exports = Tabs;
