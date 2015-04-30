import rebound from 'rebound';
import React from 'react';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  draggable: {
    width: '100%',
    height: '100%',
  }
});

export default class Dragable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    }
  }

  componentDidMount() {
    var springSystem = new rebound.SpringSystem();
    var spring = springSystem.createSpring(50, 3);

    var start = this.start.bind(this);
    var move = this.move.bind(this);
    var end = this.end.bind(this);

    this.setState({
      start: start,
      move: move,
      end: end,
      spring: spring
    });

    document.addEventListener('touchstart', start);
    document.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', end);

    var ctx = this;
    spring.addListener({
      onSpringUpdate: function(spring) {
        if (ctx.state.dragging)
          return;

        var val = spring.getCurrentValue();
        ctx.setState({
          offset: val
        });
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', start);
    document.removeEventListener('mousedown', start);
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', end);
  }

  render() {
    return (
      <div style={styles.draggable}
      >
        {React.Children.map(this.props.children, function(child) {
          return React.cloneElement(child, { offset: this.state.offset })
        }, this)}
      </div>
    );
  }

  getX(evt) {
    return 'ontouchstart' in window ? evt.changedTouches[0].clientX : evt.clientX;
  }

  start(evt) {
    this.setState({
      input: this.getX(evt),
      time: Date.now(),
      dragging: true
    });
  }

  end(evt) {
    if (!this.state.dragging)
      return;

    var target = this.state.offset + this.state.velocity * 350;

    this.state.spring.setCurrentValue(this.state.offset).setAtRest();
    this.state.spring.setVelocity(this.state.velocity * 1000).setEndValue(target);

    this.setState({
      dragging: false
    });
  }

  move(evt) {
    if (!this.state.dragging)
      return;

    evt.preventDefault();

    this.setState({
      offset: this.state.offset += this.getX(evt) - this.state.input,
      velocity: (this.getX(evt) - this.state.input) / (Date.now() - this.state.time),
      input: this.getX(evt),
      time: Date.now()
    });
    console.log(this.state.offset);
  }
}


