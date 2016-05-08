var React = require('react');

var Names = React.createClass({
  clickHandler: function(name, e) {
    e.preventDefault();
    this.props.clickUpdate(name)
  },
  render: function() {
    return(
      <ul>
        { this.props.names.map(function(name, idx) {
          return(
            <li onClick={ this.clickHandler.bind(this, name) } key={ idx }>{ name }</li>
          )
        }.bind(this)) }
      </ul>
    )
  }
})

var Autocomplete = React.createClass({
  getInitialState: function() {
    return { inputVal: '' }
  },
  clickUpdate: function(name) {
    this.setState({ inputVal: name })
  },
  updateInput: function(e) {
    this.setState({ inputVal: e.target.value })
  },
  render: function() {
    var names = this.props.names;
    var searchString = this.state.inputVal.toLowerCase();

    if (searchString !== undefined && searchString.length > 0) {
      names = names.filter(function(name) {
        return name.toLowerCase().match("^" + searchString + "")
      });
    }

    return(
      <nav>
        <input type='text' onChange={ this.updateInput } value={ this.state.inputVal }/>
        <Names names={ names} clickUpdate={ this.clickUpdate }/>
      </nav>
    )
  }
});

module.exports = Autocomplete;
