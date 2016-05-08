var React = require('react');

var Names = React.createClass({
  render: function() {
    return(
      <ul>
        { this.props.names.map(function(name, idx) {
          return( <li key={ idx }>{ name }</li> )
        }) }
      </ul>
    )
  }
})

var Autocomplete = React.createClass({
  getInitialState: function() {
    return { inputVal: '' }
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
        <Names names={ names} />
      </nav>
    )
  }
});


module.exports = Autocomplete;
