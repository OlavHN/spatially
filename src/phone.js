import './style/device.css';

import React from 'react';
import StyleSheet from 'react-style';
import rebound from 'rebound';

var SCREEN_WIDTH = 336;
var styles = StyleSheet.create({

});

export default class Phone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      offset: 0
    };
  }

  componentDidMount() {
    var springSystem = new rebound.SpringSystem();
    var spring = springSystem.createSpring(50, 5);

    var start = this.start.bind(this);
    var move = this.move.bind(this);
    var end = this.end.bind(this);

    this.setState({
      start: start,
      move: move,
      end: end,
      spring: spring
    });

    var parentNode = React.findDOMNode(this.props.parent);
    parentNode.addEventListener('touchstart', start);
    parentNode.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', end);

    spring.addListener({
      onSpringUpdate: (spring) => {
        if (this.state.dragging)
          return;

        var val = spring.getCurrentValue();
        this.setState({
          offset: val
        });
      }
    });

    // Auto rotate screens
    setInterval(() => {
      if (this.state.dragging)
        return;

      var children = React.Children.count(this.props.children);
      var targetScreen = (Math.round(this.state.offset / SCREEN_WIDTH) - 1) % children;

      var targetOffset = targetScreen * SCREEN_WIDTH;

      this.props.showScreen && this.props.showScreen(Math.abs(targetScreen));

      this.state.spring.setEndValue(targetOffset);
    }, 5000);
  }

  componentWillUnmount() {
    var parentNode = React.findDOMNode(this.props.parent);
    parentNode.removeEventListener('touchstart', start);
    parentNode.removeEventListener('mousedown', start);
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('touchend', end);
  }

  render() {
    var height = this.between(280, 450, this.props.height / 2);

    return (
      <div id="wrapper" style={{height: height}}>
        <div id="iphone">
          <div id="shadow"></div>
          <div id="side"></div>
          <div id="lines">
            <div>
              <div>
                <div></div>
              </div>
            </div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
          <div id="toggler">
            <div></div>
          </div>
          <div id="aux"></div>
          <div id="lightning"></div>
          <div id="bottom-speaker">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id="skrews">
            <div></div>
            <div></div>
          </div>
          <div id="volume">
            <div></div>
            <div></div>
          </div>
          <div id="front">
            <div id="front-cover"></div>
            <div id="camera">
               <div></div>
            </div>
            <div id="speaker"></div>
            {this.renderScreens()}
            <div id="home">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getX(evt) {
    return 'ontouchstart' in window ? evt.changedTouches[0].clientX : evt.clientX;
  }

  between(min, max, val) {
    return Math.min(max, Math.max(min, val));
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

    var children = React.Children.count(this.props.children);
    var targetOffset = this.state.offset + this.state.velocity * 350;
    var targetScreen = this.between(1 - children, 0, Math.round(targetOffset / SCREEN_WIDTH));
    var target = targetScreen * SCREEN_WIDTH;

    this.props.showScreen && this.props.showScreen(Math.abs(targetScreen));

    this.state.spring.setCurrentValue(this.state.offset).setAtRest();
    this.state.spring.setVelocity(this.state.velocity * 1000).setEndValue(target);

    this.setState({
      dragging: false
    });
  }

  move(evt) {
    if (!this.state.dragging)
      return;

    // evt.preventDefault();

    this.setState({
      offset: this.state.offset += this.getX(evt) - this.state.input,
      velocity: (this.getX(evt) - this.state.input) / (Date.now() - this.state.time),
      input: this.getX(evt),
      time: Date.now()
    });
  }

  getScreenOffset(n, offset) {
    return n * SCREEN_WIDTH + offset;
  }

  renderScreens() {
    var children = React.Children.map(this.props.children, function(child, i) {
      var offset = this.getScreenOffset(i, this.state.offset);

      var style = {
        position: 'absolute',
        left: offset,
        width: '100%',
        height: '100%'
      };

      return (
        <div style={style}>
          {child}
        </div>
      );
    }, this);

    return (
      <div id="screen">
        {children}
        <div id="top"></div>
        <div id="signal">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div id="battery">
          <div>86%</div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
