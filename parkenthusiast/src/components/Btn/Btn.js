var React = require('react');

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

var Btn = React.createClass({
  render: function () {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.props.handleClick}>{this.props.label}</button>
    );
  }
});

module.exports = Btn;
